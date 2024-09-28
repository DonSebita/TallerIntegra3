const express = require('express');

const { userRules, loginRules } = require('../rules/userRules.js');
const { registerController, loginController, adminLoginController } = require('../controller/authController.js');

const router = express.Router();

// Ruta de registro
router.post('/register', userRules, registerController);
router.post('/login', loginRules, loginController);
router.post('/admin-login', loginRules, adminLoginController);

//router.get('/forgot-password', );
//router.post('/forgot-password', );

//router.get('/change-password', );
//router.put('/change-password', );


module.exports = router;
