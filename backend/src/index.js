const express = require('express');
const cors = require('cors'); // Importa cors
const bodyParser = require('body-parser');
const { router: authRoutes, ensureAuthenticated } = require('./routes/auth.js'); // Importa las rutas de autenticación
const calendarRoutes = require('./services/calendar.js'); // Importa las rutas de Google Calendar
const passwordRoutes = require('./routes/passwordRoutes.js'); // Importa las rutas de restablecimiento de contraseña
const citasRoutes = require('./routes/citasRouter.js') // Importa las rutas de gestión de citas

const app = express();
const port = process.env.PORT || 3000;

const db = require('./config/db.js'); // Importa la conexión a la base de datos

// Configura CORS
const corsOptions = {
  origin: 'http://localhost:8081', // Cambia esto a la dirección de tu aplicación React Native
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permite el uso de credenciales (si es necesario)
};

// Usa el middleware CORS
app.use(cors(corsOptions));

// Middleware para procesar solicitudes JSON
app.use(bodyParser.json());

// Rutas de autenticación (Google OAuth)
app.use('/auth', authRoutes);

// Rutas protegidas para el calendario, que incluyen /create-event
app.use('/api', calendarRoutes);

// Usa las rutas de restablecimiento de contraseña
app.use('/api/password', passwordRoutes);

// Usa las rutas de gestion de citas
app.use('/api/citas', citasRoutes)

// Ruta base para verificar que el servidor está corriendo
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
