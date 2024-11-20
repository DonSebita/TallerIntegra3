const fs = require('fs');
const path = require('path');
const db = require('../config/db.js');
const { google } = require('googleapis');
const { promisify } = require('util');
const query = promisify(db.query).bind(db);

const TOKEN_PATH = path.resolve(__dirname, '../config/token.json');

// Cargar y configurar el token en oAuth2Client
const credentials = require('../config/credentials.json');
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oAuth2Client.setCredentials(token);
} else {
    console.error('Token no encontrado. Autentícate con /auth/google');
}

// Función para verificar y crear una cita
exports.crearCita = async (req, res) => {
    const { servicio_id, profesional_id, agenda_id, usuario_id, fecha_cita, movilizacion_id } = req.body;
    console.log("Datos recibidos para crear cita:", req.body);
    
    if (!fecha_cita || !servicio_id || !profesional_id || !usuario_id) {
        return res.status(400).send('Faltan campos requeridos.');
    }

    try {
        // Obtener día y hora desde fecha_cita
        const fecha = fecha_cita.split("T")[0];  // Solo la fecha en formato YYYY-MM-DD
        const hora = new Date(fecha_cita).toISOString().split("T")[1].substring(0, 5);  // Solo la hora en formato HH:MM

        // Verificar disponibilidad en `agenda`
        const disponibilidadQuery = `
            SELECT * FROM agenda 
            WHERE agenda_id = ? AND profesional_id = ? AND dia = ? AND hora_inicio = ? AND disponible = 1
        `;
        const agenda = await query(disponibilidadQuery, [agenda_id, profesional_id, fecha, hora]);

        if (agenda.length === 0) {
            return res.status(400).send('La fecha y hora solicitada no están disponibles.');
        }

        // Obtener el correo electrónico del cliente desde la tabla `usuarios`
        const clienteQuery = `SELECT correo FROM usuarios WHERE usuario_id = ?`;
        const cliente = await query(clienteQuery, [usuario_id]);
        const clienteEmail = cliente[0]?.correo;

        if (!clienteEmail) {
            return res.status(400).send('No se pudo encontrar el correo del cliente.');
        }

        // Insertar la cita en `citas`
        const insertCitaQuery = `
            INSERT INTO citas 
                (servicio_id, profesional_id, agenda_id, usuario_id, fecha_cita, citas_canceladas, estado_cita, movilizacion_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await query(insertCitaQuery, [
            servicio_id, profesional_id, agenda_id, usuario_id, fecha_cita, 0, 'sin confirmar', movilizacion_id
        ]);

        // Actualizar la disponibilidad en `agenda`
        const updateAgendaQuery = `
            UPDATE agenda 
            SET disponible = 0 
            WHERE agenda_id = ?
        `;
        await query(updateAgendaQuery, [agenda_id]);

        // Crear el evento en Google Calendar
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
        const event = {
            summary: `Cita para el servicio ${servicio_id}`,
            description: `Servicio ID: ${servicio_id}, Profesional ID: ${profesional_id}, Usuario ID: ${usuario_id}`,
            start: {
                dateTime: new Date(fecha_cita).toISOString(),
                timeZone: 'America/Santiago',
            },
            end: {
                dateTime: new Date(new Date(fecha_cita).getTime() + 30 * 60 * 1000).toISOString(),
                timeZone: 'America/Santiago',
            },
            attendees: [{ email: clienteEmail }],
        };

        await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        console.log('Cita y evento de Google Calendar creados exitosamente.');
        res.status(201).send({ message: 'Cita ingresada y evento creado en Google Calendar.' });
    } catch (err) {
        console.error('Error al verificar o reservar la hora:', err);
        res.status(500).send('Error al procesar la solicitud.');
    }
};

exports.crearHorarioDisponible = async (req, res) => {
    const { profesional_id, dia, hora_inicio, hora_fin } = req.body;

    // Validar campos requeridos
    if (!profesional_id || !dia || !hora_inicio || !hora_fin) {
        return res.status(400).send('Faltan campos requeridos.');
    }

    try {
        // Insertar el horario en la tabla 'agenda'
        const queryInsert = `
            INSERT INTO agenda (profesional_id, dia, hora_inicio, hora_fin, disponible) 
            VALUES (?, ?, ?, ?, 1)
        `;

        await query(queryInsert, [profesional_id, dia, hora_inicio, hora_fin]);

        res.status(201).send('Horario disponible creado exitosamente.');
    } catch (error) {
        console.error('Error al crear horario disponible:', error);
        res.status(500).send('Error al crear el horario.');
    }
};

exports.validarCita = async (req, res) => {
    const { cita_id } = req.params;

    if (!cita_id) {
        return res.status(400).send('No se encontro la cita o ya esta validada');
    }

    try {
        const results = await query('SELECT * FROM citas WHERE cita_id = ?', [cita_id]);

        if (results.length === 0) {
            return res.status(401).send('Cita no encontrada');
        }
        
        const update = `UPDATE citas SET estado_cita ='confirmada' WHERE cita_id = ?`;
        
        await query(update, [cita_id]);

        res.status(201).send('Se confirmo la cita por parte del profesional.');
        console.log('PUT - validarCita: Se actualizo la cita en la base de datos');
    } catch (err) {
        console.error('Error al actualizar la cita en la base de datos:', err);
        res.status(500).send('Error al validar la cita.');
    }
};

exports.obtenerCitasPorUsuario = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const query = `
        SELECT cita_id, servicio_id, profesional_id, agenda_id, usuario_id, fecha_cita, citas_canceladas, estado_cita, movilizacion_id 
        FROM citas 
        WHERE usuario_id = ? AND citas_canceladas = 0
      `;
      const [rows] = await db.promise().query(query, [userId]); // Usamos .promise() aquí
  
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
      res.status(500).json({ error: 'Error al obtener las citas del usuario.' });
    }
  };