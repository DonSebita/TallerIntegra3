const express = require('express');
const { crearCita, validarCita, obtenerCitasPorUsuario  } = require('../controllers/citasController.js');
const router = express.Router();

// Ruta para la creación de una cita
router.post('/crear-cita', crearCita);

// Ruta para confirmar una cita
router.post('/validar-cita', validarCita);

// Ruta para obtener las citas de un usuario específico
router.get('/:userId', obtenerCitasPorUsuario);
module.exports = router;