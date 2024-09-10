require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const fs = require('fs');
const { google } = require('googleapis');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

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

// Ruta para redirigir al usuario a la página de autenticación de Google
router.get('/google', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Redirigiendo a URL de autenticación:', authUrl);
  res.redirect(authUrl);
});

// Ruta para manejar el callback de Google OAuth y obtener el token de acceso
router.get('/google/callback', (req, res) => {
  const code = req.query.code;

  oAuth2Client.getToken(code, (err, token) => {
    if (err) return res.status(400).send('Error al obtener el token de acceso: ' + err);

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
    oAuth2Client.setCredentials(token);

    res.send('Autenticación completada. Token guardado.');
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

module.exports = { router, oAuth2Client };
