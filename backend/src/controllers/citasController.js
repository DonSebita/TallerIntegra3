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
    const { servicio_id, profesional_id, agenda_id, usuario_id, movilizacion_id } = req.body;

    console.log("Datos recibidos para crear cita:", req.body);

    if (!agenda_id || !servicio_id || !profesional_id || !usuario_id || !movilizacion_id) {
        return res.status(400).send('Faltan campos requeridos.');
    }

    try {
        const verificarDisponibilidadQuery = `
            SELECT * FROM agenda 
            WHERE agenda_id = ? AND profesional_id = ? AND disponible = 1
        `;
        const horario = await query(verificarDisponibilidadQuery, [agenda_id, profesional_id]);

        if (horario.length === 0) {
            return res.status(400).send('El horario seleccionado no está disponible o no existe.');
        }

        const horarioSeleccionado = horario[0];
        const fecha = new Date(horarioSeleccionado.dia); // Convierte el día a formato Date
        const hora = horarioSeleccionado.hora_inicio; // Usa la hora de inicio

        // Combina fecha y hora en el formato correcto
        const fechaCita = `${fecha.toISOString().split('T')[0]}T${hora}`;

        const insertarCitaQuery = `
            INSERT INTO citas 
                (servicio_id, profesional_id, agenda_id, usuario_id, fecha_cita, citas_canceladas, estado_cita, movilizacion_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await query(insertarCitaQuery, [
            servicio_id,
            profesional_id,
            agenda_id,
            usuario_id,
            fechaCita,
            0,
            'sin confirmar',
            movilizacion_id,
        ]);

        const actualizarAgendaQuery = `
            UPDATE agenda 
            SET disponible = 0 
            WHERE agenda_id = ?
        `;
        await query(actualizarAgendaQuery, [agenda_id]);

        // Crear evento en Google Calendar
        const clienteQuery = `SELECT correo FROM usuarios WHERE usuario_id = ?`;
        const cliente = await query(clienteQuery, [usuario_id]);
        const clienteEmail = cliente[0]?.correo;

        if (!clienteEmail) {
            return res.status(400).send('No se pudo encontrar el correo del cliente.');
        }

        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
        const event = {
            summary: `Cita para el servicio ${servicio_id}`,
            description: `Servicio ID: ${servicio_id}, Profesional ID: ${profesional_id}, Usuario ID: ${usuario_id}`,
            start: {
                dateTime: new Date(fechaCita).toISOString(),
                timeZone: 'America/Santiago',
            },
            end: {
                dateTime: new Date(new Date(fechaCita).getTime() + 30 * 60 * 1000).toISOString(),
                timeZone: 'America/Santiago',
            },
            attendees: [{ email: clienteEmail }],
        };

        await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        console.log('Cita y evento de Google Calendar creados exitosamente.');
        res.status(201).send('Cita creada y evento de Google Calendar agregado exitosamente.');
    } catch (error) {
        console.error('Error al crear la cita o evento de Google Calendar:', error);
        res.status(500).send('Error al procesar la creación de la cita.');
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

  exports.verCitasProfesional = async (req, res) => {
    const { profesionalId } = req.params;
    if (!profesionalId) {
        return res.status(400).send('El ID del profesional es requerido.');
    }

    try {
        const obtenerCitasQuery = `
            SELECT 
                cita_id,
                servicio_id,
                usuario_id,
                fecha_cita,
                estado_cita
            FROM citas
            WHERE profesional_id = ?
        `;
        const citas = await query(obtenerCitasQuery, [profesionalId]);

        if (citas.length === 0) {
            return res.status(404).send('No hay citas agendadas para este profesional.');
        }

        res.status(200).json(citas);
    } catch (error) {
        console.error('Error al obtener citas del profesional:', error);
        res.status(500).send('Error al obtener las citas del profesional.');
    }
};

exports.obtenerHorariosDisponiblesGlobales = async (req, res) => {
    try {
        const obtenerHorariosQuery = `
            SELECT 
                agenda_id,
                profesional_id,
                dia,
                hora_inicio,
                hora_fin,
                disponible 
            FROM agenda
            WHERE disponible = 1
        `;
        const horarios = await query(obtenerHorariosQuery);

        if (horarios.length === 0) {
            return res.status(404).send('No hay horarios disponibles.');
        }

        res.status(200).json(horarios);
    } catch (error) {
        console.error('Error al obtener horarios disponibles globales:', error);
        res.status(500).send('Error al obtener los horarios disponibles.');
    }
};
