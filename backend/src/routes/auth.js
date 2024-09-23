require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const fs = require('fs');
const { google } = require('googleapis');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Asegúrate de que está instalado
const path = require('path');
const router = express.Router();

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = path.join(__dirname, 'tokens', 'token.json');  // Guardar en la carpeta tokens

// Cargar las credenciales desde el archivo credentials.json
let credentials;
try {
  credentials = JSON.parse(fs.readFileSync('credentials.json'));
} catch (error) {
  console.error('Error al leer el archivo credentials.json:', error);
  process.exit(1);
}

const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Cargar el token guardado, si existe
fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) {
    console.log('No se encontró un token almacenado, es necesario autenticarse.');
  } else {
    oAuth2Client.setCredentials(JSON.parse(token));
    console.log('Token cargado desde', TOKEN_PATH);
  }
});

// Ruta para redirigir al usuario a la página de autenticación de Google
router.get('/google', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',  // Solicitar un refresh token
    prompt: 'consent',  // Asegurar que siempre se obtenga un refresh token
    scope: SCOPES,
  });
  console.log('Redirigiendo a URL de autenticación:', authUrl);
  res.redirect(authUrl);
});

// Ruta para manejar el callback de Google OAuth y obtener el token de acceso
router.get('/google/callback', (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('No se recibió el código de autorización.');
  }

  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      console.error('Error al obtener el token de acceso:', err);
      return res.status(400).send('Error al obtener el token de acceso.');
    }

    // Guardar tanto el access_token como el refresh_token
    try {
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      console.log('Token guardado en', TOKEN_PATH);
    } catch (err) {
      console.error('Error al guardar el token:', err);
      return res.status(500).send('Error al guardar el token.');
    }

    oAuth2Client.setCredentials(token);
    res.send('Autenticación completada. Token guardado.');
  });
});

// Ruta para listar eventos en el calendario de Google
router.get('/list-events', (req, res) => {
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return res.status(400).send('Es necesario autenticarse.');

    oAuth2Client.setCredentials(JSON.parse(token));

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, result) => {
      if (err) return res.status(400).send('Error al listar eventos: ' + err);

      const events = result.data.items;
      if (events.length) {
        console.log('Próximos eventos:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
        res.status(200).json(events);
      } else {
        console.log('No se encontraron eventos.');
        res.status(200).send('No se encontraron eventos.');
      }
    });
  });
});

// Ruta para iniciar sesión y obtener un token JWT
router.post('/login', async (req, res) => {
  const { rut, contraseña } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM Usuarios WHERE rut = ?', [rut]);

    if (!user) return res.status(401).send('Usuario no encontrado');

    const match = await bcrypt.compare(contraseña, user.contraseña);
    if (!match) return res.status(401).send('Contraseña incorrecta');

    // Generar un token JWT
    const token = jwt.sign({ id: user.usuario_id, rut: user.rut }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;  // Exportar solo el router
