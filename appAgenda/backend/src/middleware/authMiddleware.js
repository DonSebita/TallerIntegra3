const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'clave_ejemplo';  // Asegúrate de usar la misma clave

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Verificar si el encabezado contiene el token
  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso denegado, se requiere token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar el token
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;  // Almacenar el usuario verificado en req.user
    next();  // Si el token es válido, continuar con la solicitud
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
