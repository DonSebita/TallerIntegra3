const { check } = require('express-validator');

const loginRules = [
  check("email")
    .isEmail()
    .withMessage("El campo 'email' debe ser una dirección de correo electrónico válida"),
  check("password")
  .notEmpty()
  .withMessage("El campo 'password' no puede estar vacío"),
]

const userRules = [
  check('rut')
    .notEmpty()
    .withMessage('El Rut es requerio')
    .isLength({ min: 8, max: 20 })
    .withMessage('El rut debe tener entre 8 y 9 caracteres'),
  check('primer_nombre')
    .notEmpty()
    .withMessage('El primer nombre es requerido'),
  check('apellido_paterno')
    .isDate()
    .withMessage('Debe ser una fecha válida'),
  check('ciudad')
    .notEmpty()
    .withMessage('La ciudad es requerida'),
  check('comuna')
    .notEmpty()
    .withMessage('La comuna es requerida'),
  check('direccion')
    .notEmpty()
    .withMessage('La dirección es requerida'),
  check('correo')
    .isEmail()
    .withMessage('Debe proporcionar un correo electrónico válido'),
  check('contraseña')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage("El campo 'password' debe contener al menos un número")
    .matches(/[a-z]/)
    .withMessage("El campo 'password' debe contener al menos una letra minúscula")
]

module.exports = {
  loginRules,
  userRules
};