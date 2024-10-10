const express = require('express');
const { forgotPassword, resetPassword } = require('../authController'); // Asegúrate de que las funciones existen en authController
const router = express.Router();

// Ruta para solicitar el restablecimiento de contraseña
router.post('/forgot-password', forgotPassword);

// Ruta para restablecer la contraseña con el token
router.patch('/reset-password/:token', resetPassword);

module.exports = router;
