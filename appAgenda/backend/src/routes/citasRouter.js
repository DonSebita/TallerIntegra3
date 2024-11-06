const express = require('express');
const { crearCita } = require('../controllers/citasController.js');
const router = express.Router();

// Ruta para la creación de una cita
router.post('/crear-cita', crearCita);

module.exports = router;