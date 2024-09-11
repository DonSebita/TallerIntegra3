require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const db = require('../config/db.js')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


async function validateRules (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rut } = req.body;

  try {
    const [exsitignUser] = await db.query('SELECT * FROM Usuarios WHERE rut = ?', [rut]);
    if (exsitignUser) {
      return res.status(400).json({ msg: 'El Rut ya está registrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
}


// Middleware para verificar el token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
