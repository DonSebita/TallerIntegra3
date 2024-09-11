const bcrypt = require('bcryptjs');


async function registerController (req, res) {
  try{
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
};

async function loginController (req, res) {
  try {
    const [user] = await db.query('SELECT * FROM Usuarios WHERE rut = ?', [rut]);
    
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

async function profesionalLoginController (req, res) {
  try {
    const [user] = await db.query('SELECT * FROM Usuarios WHERE rut = ?', [rut]);
    
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