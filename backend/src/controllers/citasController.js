const bcrypt = require('bcrypt');
const db = require('../config/db.js');
const { promisify } = require('util');

// Convertir `db.query` a una promesa
const query = promisify(db.query).bind(db);

// Función para registrar un nuevo usuario
exports.crearCita = async (req, res) => {
    const { servicio_id, profesional_id, agenda_id, usuario_id, fecha_cita, hora_cita, movilizacion_id } = req.body;

    // Verifica que el campo requerido esta precente
    if (!fecha_cita) {
        return res.status(400).send('Faltan campos requeridos.');
    }

    const estado_cita = 'sin confirmar';
    const fecha = fecha_cita + ' ' + hora_cita;

    const insertUserQuery = `
      INSERT INTO citas 
        (fecha_cita, citas_canceladas, estado_cita) 
      VALUES (?, ?, ?)`;

    const values = [
      fecha, 0, estado_cita
    ];

    try {
        await query(insertUserQuery, values);
        res.status(201).send('Cita ingresada exitosamente.');

        console.log('POST - crear-cita: Se ingreso la cita a la base de datos')
    } catch (err) {
        console.error('Error al insertar la cita en la base de datos:', err);
        res.status(500).send('Error al ingrasar la cita.');
    }
};