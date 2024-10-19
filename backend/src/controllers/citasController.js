const bcrypt = require('bcrypt');
const db = require('../config/db.js');
const { promisify } = require('util');

// Convertir `db.query` a una promesa
const query = promisify(db.query).bind(db);

// Función para registrar un nuevo usuario
exports.crearCita = async (req, res) => {
    const { fecha_cita } = req.body;

    // Verifica que el campo requerido esta precente
    if (!fecha_cita) {
        return res.status(400).send('Falta el campo requerido.');
    }

    const insertUserQuery = `
      INSERT INTO Citas 
        (fecha_cita) 
      VALUES (?)`;

    const values = [fecha_cita];

    try {
        await query(insertUserQuery, values);
        res.status(201).send('Cita ingresada exitosamente.');

        console.log('POST - crear-cita: Se ingreso la cita a la base de datos')
    } catch (err) {
        console.error('Error al insertar la cita en la base de datos:', err);
        res.status(500).send('Error al ingrasar la cita.');
    }
};