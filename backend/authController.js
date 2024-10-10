const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db'); // Asegúrate de que este archivo exista y contenga la conexión a la base de datos
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, 
            apellido_materno, fecha_nacimiento, ciudad, comuna, direccion, 
            telefono, celular, correo, contraseña, validado } = req.body;

    // Verifica que todos los campos requeridos están presentes
    if (!rut || !primer_nombre || !apellido_paterno || !correo || !contraseña) {
        return res.status(400).send('Faltan campos requeridos.');
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const insertUserQuery = `
      INSERT INTO usuarios 
        (rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, 
        apellido_materno, fecha_nacimiento, ciudad, comuna, direccion, 
        telefono, celular, correo, contraseña, validado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        rut,
        primer_nombre,
        segundo_nombre,
        tercer_nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        ciudad,
        comuna,
        direccion,
        telefono,
        celular,
        correo,
        hashedPassword,
        validado
    ];

    db.query(insertUserQuery, values, (err, result) => {
        if (err) {
            console.error('Error al insertar el usuario en la base de datos:', err);
            return res.status(500).send('Error al registrar el usuario.');
        }
        res.status(201).send('Usuario registrado exitosamente.');
    });
});

router.post('/login', async (req, res) => {
    const { rut, contraseña } = req.body;
    
    if (!rut || !contraseña){
        return res.status(400).send('Faltan los campos requeridos');
    }
    
    const { user } = await db.query('SELECT * FROM usuarios WHERE rut = ?', [rut]);
    
    if (!user) return res.status(401).send('Usuario no encontrado');

    const match = await bcrypt.compare(contraseña, user.contraseña);
    if(!match){
        return res.status(401).send('Contraseña incorrecta');
    } else {
        return res.status(201).send('Sesión iniciada correctamente');
    }

});

module.exports = router;
