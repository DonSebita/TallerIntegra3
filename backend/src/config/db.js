const mysql = require('mysql2');
require('dotenv').config();  // Asegúrate de cargar las variables de entorno

// Crear la conexión a la base de datos
const db = mysql.createConnection({
  host: '45.236.129.172',
  user: 'ti',  
  password: 'tallerIntegracion3',  
  database: 'Ti3', 
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos prueba_1');
});

module.exports = db;
