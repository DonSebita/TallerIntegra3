const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Asegúrate de importar jwt
const db = require('../config/db'); // Asegúrate de importar tu conexión a la base de datos

async function registerController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    rut,
    primer_nombre,
    segundo_nombre,
    tercer_nombre,
    apellido_paterno,
    apellido_materno,
    fecha_nacimiento,
    ciudad,
    comuna,
    direccion,
    sector_id,
    telefono,
    celular,
    correo,
    contraseña
  } = req.body; // Extraer valores del cuerpo de la solicitud

  try {
    const [existingUser] = await db.query('SELECT * FROM usuarios WHERE rut = ?', [rut]);
    
    if (existingUser) {
      return res.status(400).json({ msg: 'El RUT ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);
    
    // Insertar el nuevo usuario en la base de datos
    await db.query(
      `INSERT INTO usuarios (rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, apellido_materno, fecha_nacimiento, ciudad, comuna, direccion, sector_id, telefono, celular, correo, contraseña, validado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
      [rut, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, apellido_materno, fecha_nacimiento, ciudad, comuna, direccion, sector_id, telefono, celular, correo, hashedPassword, false]);
    
    res.status(201).json({ msg: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
}

async function loginController(req, res) {
  const { rut, contraseña } = req.body; // Extraer valores del cuerpo de la solicitud

  try {
    const [user] = await db.query('SELECT * FROM usuarios WHERE rut = ?', [rut]);
    
    if (!user) return res.status(401).send('Usuario no encontrado');

    const match = await bcrypt.compare(contraseña, user.contraseña);
    if (!match) return res.status(401).send('Contraseña incorrecta');

    // Generar un token JWT
    const token = jwt.sign({ id: user.usuario_id, rut: user.rut }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
}

// Función profesionalLoginController sigue el mismo patrón

async function adminLoginController(req, res) {
  const { rut, contraseña } = req.body; // Extraer valores del cuerpo de la solicitud

  try {
    const [user] = await db.query('SELECT * FROM administradores WHERE rut = ?', [rut]);
    
    if (!user) return res.status(401).send('Usuario no encontrado');

    const match = await bcrypt.compare(contraseña, user.contraseña);
    if (!match) return res.status(401).send('Contraseña incorrecta');

    // Generar un token JWT
    const token = jwt.sign({ id: user.usuario_id, rut: user.rut }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
}

module.exports = {
  registerController,
  loginController,
  adminLoginController,
};

