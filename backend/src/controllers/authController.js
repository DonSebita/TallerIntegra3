const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../config/db.js');
const { promisify } = require('util');

// Convertir `db.query` a una promesa
const query = promisify(db.query).bind(db);

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
    const { rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, apellido_materno, fecha_nacimiento, ciudad, comuna, direccion, telefono, celular, correo, contrasena } = req.body;

    // Verifica que todos los campos requeridos están presentes
    if (!rut || !primer_nombre || !apellido_paterno || !correo || !contrasena) {
        return res.status(400).send('Faltan campos requeridos.');
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const rol = 'usuario'; // Rol por defecto es 'usuario'
    const validado = 1;    // Para tinyint(1), usamos 1 para indicar que el usuario está validado

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

        const user = results[0]; // Obtener el usuario encontrado

        const match = await bcrypt.compare(contraseña, user.contrasena);  // Asegúrate de usar "contrasena" si así está en la base de datos
        
        if (!match) {
            return res.status(401).send({succes:false, message:'Contraseña incorrecta'});
        } else if (user.validado !== 1) {
            // Verificar que el usuario esté validado (validado debe ser 1 en la BD)
            return res.status(403).send({success:false, message:'Tu cuenta no ha sido validada. Contacta al administrador.'});
        } else {
            console.log('POST - login: El usuario inició sesión correctamente');
            
            // Retorna el rol y la validación para usar en el frontend
            return res.status(200).json({message: 'Sesión iniciada correctamente', rol: user.rol, validado: user.validado,success:true });
        }
    } catch (err) {
        console.error('Error en el proceso de login:', err);
        return res.status(500).send('Error en el servidor');
    }
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

        // Generar el token de restablecimiento con 8 bytes (16 caracteres en hex)
        const resetToken = crypto.randomBytes(8).toString('hex');  // Token más pequeño
        const expiration = Date.now() + 10 * 60 * 1000; // 10 minutos
        console.log("Token en texto plano: ", resetToken);

        // Guardar el token en la base de datos en su forma original
        await query('UPDATE usuarios SET reset_token = ?, reset_token_expiration = ? WHERE correo = ?', [resetToken, expiration, correo]);

        // Configuración de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // URL para restablecer la contraseña
        const resetURL = `http://localhost:3000/api/password/reset-password/${resetToken}`;
        console.log("URL de restablecimiento con token: ", resetURL);  // Asegúrate de que el token es el correcto
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

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { contraseña } = req.body;

    try {
        // Primero, verifica si el token coincide, independientemente de la fecha de expiración
        const results = await query('SELECT * FROM usuarios WHERE reset_token = ?', [token]);

        if (results.length === 0) {
            // Si no se encuentra el token, el problema es el token inválido
            console.log("Token no válido.");
            return res.status(400).json({ message: 'Token no válido.' });
        }

        const user = results[0];

        // Verificar si el token ha expirado
        if (Date.now() > user.reset_token_expiration) {
            // Si la hora actual es mayor que el tiempo de expiración, el problema es la fecha
            console.log("El token ha expirado.");
            console.log("Hora actual: ", Date.now());
            console.log("Expiración del token almacenado: ", user.reset_token_expiration);
            return res.status(400).json({ message: 'El token ha expirado.' });
        }

        // Si ambos verifican bien, continúa con el proceso de restablecimiento de contraseña
        console.log("Token válido y dentro de la fecha de expiración.");
        console.log("Usuario encontrado con el token:", user.correo);

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Actualizar la contraseña y borrar los campos de token
        await query('UPDATE usuarios SET contraseña = ?, reset_token = NULL, reset_token_expiration = NULL WHERE correo = ?', [hashedPassword, user.correo]);

        res.status(200).json({ message: 'Contraseña restablecida con éxito.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al restablecer la contraseña.' });
    }
};
