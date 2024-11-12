const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const express = require('express');
const authController = require('../controllers/authController.js');
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');
const router = express.Router();

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = path.resolve(__dirname, '../config/token.json');



// Ruta para registrar un nuevo usuario
router.post('/register', authController.register); // Pasa la función específica para cada ruta

// Ruta para login
router.post('/login', authController.login); // Ahora la función login

// Ruta para login de admins
router.post('/login-admin', authController.loginAdmin);

router.post('/logout', authController.logout);

// Define la ruta absoluta al archivo credentials.json
const credentialsPath = path.resolve(__dirname, '../config/credentials.json');

// Cargar las credenciales desde el archivo credentials.json
let credentials;
try {
  credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
} catch (error) {
  console.error('Error al leer el archivo credentials.json:', error);
  process.exit(1); // Detiene el servidor si no se puede cargar el archivo
}

const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Ruta para redirigir al usuario a la página de autenticación de Google
router.get('/google', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // Permite usar tokens de actualización
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
    
    // Guardar el token en token.json
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
    oAuth2Client.setCredentials(token);
    
    res.send('Autenticación completada. Token guardado.');
  });
});

// Middleware para asegurarse de que el usuario esté autenticado
function ensureAuthenticated(req, res, next) {
  if (!fs.existsSync(TOKEN_PATH)) {
    return res.status(403).send('Usuario no autenticado.');
  }
  
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
  oAuth2Client.setCredentials(token);
  next(); // Continuar con la siguiente acción
}


module.exports = { router, oAuth2Client, ensureAuthenticated };
