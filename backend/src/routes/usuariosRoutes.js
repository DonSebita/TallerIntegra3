const express = require('express');
const { getUsuarios, getUsuarioDetalles, verificarUsuario, borrarUsuario } = require('../controllers/usuariosController');
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', getUsuarios);

// Ruta para obtener los detalles de un usuario específico
router.get('/:id', getUsuarioDetalles);

// Ruta para cambiar el estado del usuario a verificado
router.put('/verificar/:id', verificarUsuario);

// Ruta para borrar un usuario según el ID
router.delete('/:id', borrarUsuario);

module.exports = router;
