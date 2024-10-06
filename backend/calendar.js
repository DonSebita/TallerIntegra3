const { google } = require('googleapis');
const express = require('express');
const router = express.Router();
const { oAuth2Client } = require('./auth'); // Importar el cliente de autenticación

// Ruta para crear un evento en Google Calendar
router.post('/create-event', (req, res) => {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const event = {
    summary: req.body.summary,
    description: req.body.description,
    start: {
      dateTime: req.body.startDateTime,
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: req.body.endDateTime,
      timeZone: 'America/Los_Angeles',
    },
  };

  calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  }, (err, event) => {
    if (err) {
      console.error('Error al crear el evento:', err);
      return res.status(400).send('Error al crear el evento: ' + err);
    }
    console.log('Evento creado: %s', event.data.htmlLink);
    res.send('Evento creado: ' + event.data.htmlLink);
  });
});

// Ruta para listar eventos en Google Calendar
router.get('/list-events', async (req, res) => {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  try {
    // Cambia timeMin para incluir eventos de una semana atrás hasta ahora
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);  // Retrocede 7 días desde hoy

    const response = await calendar.events.list({
      calendarId: 'primary',  // Asegúrate de que sea el calendario correcto
      timeMin: oneWeekAgo.toISOString(),  // Cambia para incluir eventos más recientes
      maxResults: 20,  // Ajusta el límite si es necesario
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events = response.data.items;

    if (events.length) {
      res.status(200).json(events);  // Enviar los eventos en formato JSON
    } else {
      res.status(200).json({ msg: 'No se encontraron eventos.' });
    }

  } catch (err) {
    console.error('Error al listar los eventos:', err);
    res.status(500).json({ msg: 'Error al listar los eventos', error: err.message });
  }
});

module.exports = router;
