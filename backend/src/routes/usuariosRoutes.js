const express = require('express');
const { getUsuarios, getUsuarioDetalles } = require('../controllers/usuariosController');
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', getUsuarios);

// Ruta para obtener los detalles de un usuario específico
router.get('/:id', getUsuarioDetalles);

module.exports = router;
