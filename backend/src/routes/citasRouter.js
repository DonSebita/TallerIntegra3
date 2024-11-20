const express = require('express');
const { crearCita, validarCita, obtenerCitasPorUsuario, crearHorarioDisponible  } = require('../controllers/citasController.js');
const router = express.Router();

// Ruta para la creación de una cita
router.post('/crear-cita', crearCita);
//ruta para la creacion de horario para cita
router.post('/crear-horario', crearHorarioDisponible)

// Ruta para confirmar una cita
router.put('/validar-cita/:cita_id', validarCita);

// Ruta para obtener las citas de un usuario específico
router.get('/:userId', obtenerCitasPorUsuario);
module.exports = router;