const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../config/db.js');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Convertir `db.query` a una promesa
const query = promisify(db.query).bind(db);

// Secret para JWT (debería estar en tu archivo .env)
const JWT_SECRET = process.env.JWT_SECRET || 'clave_ejemplo';

// Lista negra de tokens (en producción, esto debería estar en la base de datos)
const blacklist = new Set();

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
    const { rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, apellido_materno, fecha_nacimiento, ciudad, comuna, direccion, telefono, celular, correo, contrasena } = req.body;

    if (!rut || !primer_nombre || !apellido_paterno || !correo || !contrasena) {
        return res.status(400).send('Faltan campos requeridos.');
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const rol = 'usuario';
    const validado = 1;

    const insertUserQuery = `
      INSERT INTO usuarios 
        (rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, 
        apellido_materno, fecha_nacimiento, ciudad, comuna, direccion, 
        telefono, celular, correo, contrasena, validado, rol) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno,
        apellido_materno, fecha_nacimiento, ciudad, comuna, direccion,
        telefono, celular, correo, hashedPassword, validado, rol
    ];

    try {
        await query(insertUserQuery, values);
        res.status(201).send('Usuario registrado exitosamente.');
        console.log('POST - register: Se ingresó el usuario a la base de datos');
    } catch (err) {
        console.error('Error al insertar el usuario en la base de datos:', err);
        res.status(500).send('Error al registrar el usuario.');
    }
};

// Función para manejar el login
exports.login = async (req, res) => {
    const { rut, contraseña } = req.body;

    if (!rut || !contraseña) {
        return res.status(400).send('Faltan los campos requeridos');
    }

    try {
        const results = await query('SELECT * FROM usuarios WHERE rut = ?', [rut]);

        if (results.length === 0) {
            return res.status(401).send('Usuario no encontrado');
        }

        const user = results[0];
        const match = await bcrypt.compare(contraseña, user.contrasena);

        if (!match) {
            return res.status(401).send({ success: false, message: 'Contraseña incorrecta' });
        } else if (user.validado !== 1) {
            return res.status(403).send({ success: false, message: 'Tu cuenta no ha sido validada. Contacta al administrador.' });
        } else {
            console.log('POST - login: El usuario inició sesión correctamente');

            const payload = {
                userId: user.usuario_id,
                rut: user.rut,
                rol: user.rol,
                loginTime: Date.now()
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            console.log('JWT Token generado:', token);

            return res.status(200).json({
                success: true,
                message: 'Sesión iniciada correctamente',
                token: token,
                rol: user.rol,
                validado: user.validado
            });
        }
    } catch (err) {
        console.error('Error en el proceso de login:', err);
        return res.status(500).send('Error en el servidor');
    }
};

// Función para manejar el login para profesionales
exports.loginAdmin = async (req, res) => {
    const { rut, contraseña } = req.body;

    if (!rut || !contraseña) {
        return res.status(400).send('Faltan los campos requeridos');
    }

    try {
        const results = await query(`SELECT * FROM usuarios WHERE rut = ? and rol = 'admin'`, [rut]);

        if (results.length === 0) {
            return res.status(401).send('Usuario no encontrado');
        }

        const user = results[0];
        const match = await bcrypt.compare(contraseña, user.contrasena);

        if (!match) {
            return res.status(401).send({ success: false, message: 'Contraseña incorrecta' });
        } else if (user.validado !== 1) {
            return res.status(403).send({ success: false, message: 'Tu cuenta no ha sido validada. Contacta al administrador.' });
        } else {
            console.log('POST - login: El usuario inició sesión correctamente');

            const payload = {
                userId: user.usuario_id,
                rut: user.rut,
                rol: user.rol,
                loginTime: Date.now()
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            console.log('JWT Token generado:', token);

            return res.status(200).json({
                success: true,
                message: 'Sesión iniciada correctamente',
                token: token,
                rol: user.rol,
                validado: user.validado
            });
        }
    } catch (err) {
        console.error('Error en el proceso de login:', err);
        return res.status(500).send('Error en el servidor');
    }
};

// Función para cerrar sesión e invalidar el token
exports.logout = (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado' });
    }

    // Añadir el token a la lista negra
    blacklist.add(token);
    console.log('Token añadido a la lista negra:', token);

    return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};

// Middleware para verificar si el token está en la lista negra
exports.isTokenBlacklisted = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (blacklist.has(token)) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    next();
};

// Función para solicitar restablecimiento de contraseña
exports.forgotPassword = async (req, res) => {
    const { correo } = req.body;

    try {
        const results = await query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'El correo no está registrado.' });
        }

        const user = results[0];
        const resetToken = crypto.randomBytes(8).toString('hex');
        const expiration = Date.now() + 10 * 60 * 1000;

        await query('UPDATE usuarios SET reset_token = ?, reset_token_expiration = ? WHERE correo = ?', [resetToken, expiration, correo]);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetURL = `Este es tu código de restablecimiento de contraseña: ${resetToken}`;
        const message = `Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar: \n\n ${resetURL}`;

        await transporter.sendMail({
            to: correo,
            from: 'soporte@tuapp.com',
            subject: 'Restablecimiento de contraseña',
            text: message,
        });

        res.status(200).json({ message: 'Correo de restablecimiento enviado.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Hubo un problema al enviar el correo.' });
    }
};

// Función para restablecer la contraseña
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { contraseña } = req.body;

    try {
        const results = await query('SELECT * FROM usuarios WHERE reset_token = ?', [token]);

        if (results.length === 0) {
            return res.status(400).json({ message: 'Token no válido.' });
        }

        const user = results[0];

        if (Date.now() > user.reset_token_expiration) {
            return res.status(400).json({ message: 'El token ha expirado.' });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        await query('UPDATE usuarios SET contrasena = ?, reset_token = NULL, reset_token_expiration = NULL WHERE correo = ?', [hashedPassword, user.correo]);

        res.status(200).json({ message: 'Contraseña restablecida con éxito.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al restablecer la contraseña.' });
    }
};
