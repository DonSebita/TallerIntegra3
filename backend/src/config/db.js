const mysql = require('mysql');
require('dotenv').config();  // Asegúrate de cargar las variables de entorno

// Crear la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',   // Asegúrate de que este usuario es correcto
  password: process.env.DB_PASSWORD || '',  // Asegúrate de que la contraseña es correcta
  database: process.env.DB_NAME || 'prueba_1'  // Verifica que el nombre de la base de datos es correcto
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos prueba_1');
});

module.exports = db;
