const express = require('express');
const { crearCita, validarCita } = require('../controllers/citasController.js');
const router = express.Router();

// Ruta para la creación de una cita
router.post('/crear-cita', crearCita);

// Ruta para confirmar una cita
router.post('/validar-cita', validarCita);

module.exports = router;