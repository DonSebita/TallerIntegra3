require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { authenticateToken } = require('./src/middleware/authMiddleware.js');
const authRoutes = require('./src/routes/auth.js');
const calendarRoutes = require('./src/routes/calendar.js');
const userRoutes = require('./src/routes/users/user.js');
const db = require('./src/config/db.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(bodyParser.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de usuario
app.use('/users', userRoutes);

// Rutas protegidas para el calendario
app.use('/api', authenticateToken, calendarRoutes);

// Asegúrate de no volver a llamar a `db.connect` aquí si ya lo hiciste en `db.js`
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
