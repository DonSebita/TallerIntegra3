const express = require('express');
const { crearCita, validarCita, obtenerCitasPorUsuario, crearHorarioDisponible, verCitasUsuario,verCitasProfesional, obtenerHorariosDisponiblesGlobales  } = require('../controllers/citasController.js');
const router = express.Router();
const citasController = require('../controllers/citasController');

// Ruta para la creación de una cita
router.post('/crear-cita', crearCita);

router.post('/crear-horario', crearHorarioDisponible)
// Ruta para confirmar una cita
router.put('/validar-cita/:cita_id', validarCita);

//ruta
router.get('/profesional/:profesionalId', citasController.verCitasProfesional);
// Ruta para obtener citas de un usuario específico
router.get('/usuario/:usuarioId', verCitasUsuario);

router.get('/disponibles', citasController.obtenerHorariosDisponiblesGlobales);
// Ruta para obtener las citas de un usuario específico
router.get('/:userId', obtenerCitasPorUsuario);
module.exports = router;