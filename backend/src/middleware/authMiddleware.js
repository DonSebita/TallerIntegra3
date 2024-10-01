require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const db = require('../config/db.js')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

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

module.exports = {
  authenticateToken,
};
