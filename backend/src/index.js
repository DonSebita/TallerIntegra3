const express = require('express');
const cors = require('cors'); // Importa cors
const bodyParser = require('body-parser');
const { router: authRoutes, ensureAuthenticated } = require('./routes/auth.js'); // Importa las rutas de autenticación
const calendarRoutes = require('./services/calendar.js'); // Importa las rutas de Google Calendar
const passwordRoutes = require('./routes/passwordRoutes.js'); // Importa las rutas de restablecimiento de contraseña
const citasRoutes = require('./routes/citasRouter.js'); // Importa las rutas de gestión de citas
const agendaRoutes = require('./routes/agendaRoutes.js'); // Importa las rutas de agenda
const authMiddleware = require('./middleware/authMiddleware.js');
const usuariosRoutes = require('./routes/usuariosRoutes.js');
const mysql = require('mysql'); // Importa mysql

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: '45.236.129.172',       // Dirección de tu base de datos
    user: 'ti',                   // Usuario de la base de datos
    password: 'tallerIntegracion3', // Contraseña del usuario
    database: 'Ti3',              // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida.');
});

// Configura CORS
const corsOptions = {
    origin: 'http://localhost:8081', // Cambia esto a la dirección de tu aplicación React Native
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite el uso de credenciales (si es necesario)
};
app.use(cors(corsOptions));

// Middleware para procesar solicitudes JSON
app.use(bodyParser.json());

// Rutas de autenticación (Google OAuth)
app.use('/auth', authRoutes);

// Rutas protegidas para el calendario, que incluyen /create-event
app.use('/api', calendarRoutes);

// Ruta para Datos de Usuarios:
app.use('/api/usuarios', usuariosRoutes);

// Usa las rutas de restablecimiento de contraseña
app.use('/api/password', passwordRoutes);

// Usa las rutas de gestión de citas
app.use('/api/citas', citasRoutes);

// Usa las rutas de agenda para manejar horarios disponibles
app.use('/api/agenda', agendaRoutes);

// Ruta base para verificar que el servidor está corriendo
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente!');
});

// Endpoint para crear una cita
app.post('/api/citas/crear-cita', (req, res) => {
    const { usuario_id, profesional_id, agenda_id, servicio_id, movilizacion_id } = req.body;

    // Validar los datos enviados
    if (!usuario_id || !profesional_id || !agenda_id || !servicio_id || !movilizacion_id) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Crear la consulta SQL
    const query = `
        INSERT INTO citas (usuario_id, profesional_id, agenda_id, servicio_id, movilizacion_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    // Ejecutar la consulta
    db.query(query, [usuario_id, profesional_id, agenda_id, servicio_id, movilizacion_id], (err, result) => {
        if (err) {
            console.error('Error al insertar la cita en la base de datos:', err);
            return res.status(500).json({ message: 'Error al crear la cita.' });
        }

        res.status(201).json({
            message: 'Cita creada exitosamente.',
            citaId: result.insertId,
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
