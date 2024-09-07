const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const db = require('../../db'); // Conexión a la base de datos

const router = express.Router();

// Ruta de registro
router.post('/register', [
  // Validaciones
  check('rut').notEmpty().withMessage('El RUT es requerido').isLength({ min: 8, max: 20 }).withMessage('El RUT debe tener entre 8 y 20 caracteres'),
  check('primer_nombre').notEmpty().withMessage('El primer nombre es requerido'),
  check('apellido_paterno').notEmpty().withMessage('El apellido paterno es requerido'),
  check('fecha_nacimiento').isDate().withMessage('Debe ser una fecha válida'),
  check('ciudad').notEmpty().withMessage('La ciudad es requerida'),
  check('comuna').notEmpty().withMessage('La comuna es requerida'),
  check('direccion').notEmpty().withMessage('La dirección es requerida'),
  check('correo').isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
  check('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, apellido_materno, fecha_nacimiento, ciudad, comuna, direccion, sector_id, telefono, celular, correo, contraseña } = req.body;

  try {
    // Verificar si el RUT ya está registrado
    const [existingUser] = await db.query('SELECT * FROM Usuarios WHERE rut = ?', [rut]);
    if (existingUser) {
      return res.status(400).json({ msg: 'El RUT ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    // Insertar el nuevo usuario en la base de datos
    await db.query('INSERT INTO Usuarios (rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, apellido_materno, fecha_nacimiento, ciudad, comuna, direccion, sector_id, telefono, celular, correo, contraseña, validado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, apellido_materno, fecha_nacimiento, ciudad, comuna, direccion, sector_id, telefono, celular, correo, hashedPassword, false]);

    res.status(201).json({ msg: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
