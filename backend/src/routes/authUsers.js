const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../config/db.js'); // Conexión a la base de datos

const { userRules, loginRules, profesionalLoginController } = require('../rules/userRules.js');
const validateRules = require('../middleware/authMiddleware.js');
const { reguiterControler, loginController } = require('../controller/authController.js');

const router = express.Router();

// Ruta de registro
router.post('/register', userRules, validateRules, reguiterControler);
router.post('/login', loginRules, validateRules, loginController);
router.post('/profesional-login', loginRules, validateRules, profesionalLoginController);

//router.get('/forgot-password', );
//router.post('/forgot-password', );

//router.get('/change-password', );
//router.put('/change-password', );


module.exports = router;
