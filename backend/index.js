require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const express = require('express');
const bodyParser = require('body-parser');
const { authenticateToken } = require('./src/middleware/authMiddleware.js'); // Importar el middleware de autenticación
const authRoutes = require('./src/routes/auth.js');
const calendarRoutes = require('./src/routes/calendar.js');
const userRoutes = require('./src/routes/authUsers.js');
const db = require('./src/config/db.js');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

// Middleware para procesar solicitudes JSON
app.use(bodyParser.json());

app.use(router);

// Rutas de autenticación (Google OAuth y login)
app.use('/auth', authRoutes);

// Rutas de usuario
app.use('/users', userRoutes); // Usa las rutas de usuario en la ruta /users

// Rutas protegidas para el calendario, que incluyen /create-event
app.use('/api', authenticateToken, calendarRoutes); // Aplicar el middleware de autenticación

db.connect(function(err) {
  if(err) throw err;
  console.log('Conexión a la Base de Datos Exitosa!');

  // Ruta base para verificar que el servidor está corriendo
  app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente!');
  });

  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
})
