require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const express = require('express');
const bodyParser = require('body-parser');
const { authenticateToken } = require('./routes/authMiddleware'); // Importar el middleware de autenticación
const authRoutes = require('./routes/auth');
const calendarRoutes = require('./routes/calendar');
const userRoutes = require('./routes/users/user');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar solicitudes JSON
app.use(bodyParser.json());

// Rutas de autenticación (Google OAuth y login)
app.use('/auth', authRoutes);

// Rutas de usuario
app.use('/users', userRoutes); // Usa las rutas de usuario en la ruta /users

// Rutas protegidas para el calendario, que incluyen /create-event
app.use('/api', authenticateToken, calendarRoutes); // Aplicar el middleware de autenticación

// Ruta base para verificar que el servidor está corriendo
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
