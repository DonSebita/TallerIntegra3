const db = require('../config/db.js'); // Conexión a la base de datos
const { promisify } = require('util');
const query = promisify(db.query).bind(db); // Promisify para consultas SQL

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
    try {
        const obtenerUsuariosQuery = `
            SELECT usuario_id, primer_nombre, segundo_nombre, apellido_paterno, correo, rol, validado 
            FROM usuarios
        `;
        const usuarios = await query(obtenerUsuariosQuery);

        // Transformar los datos para enviarlos al frontend
        const usuariosTransformados = usuarios.map(user => ({
            id: user.usuario_id,
            name: `${user.primer_nombre} ${user.segundo_nombre || ''} ${user.apellido_paterno}`.trim(),
            email: user.correo,
            role: user.rol,
            status: user.validado ? 'Verificado' : 'Sin Verificar',
        }));

        res.status(200).json(usuariosTransformados);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error al obtener los usuarios.');
    }
};

// Obtener detalles de un usuario por ID
exports.getUsuarioDetalles = async (req, res) => {
    const { id } = req.params;

    try {
        // Consultar detalles del usuario
        const usuarioQuery = `
            SELECT usuario_id, primer_nombre, segundo_nombre, apellido_paterno, correo, rol, validado 
            FROM usuarios
            WHERE usuario_id = ?
        `;
        const usuarios = await query(usuarioQuery, [id]);

        if (usuarios.length === 0) {
            return res.status(404).send('Usuario no encontrado.');
        }

        const usuario = usuarios[0];

        // Consultar citas del usuario
        const citasQuery = `
            SELECT c.fecha_cita, s.nombre_servicio 
            FROM citas AS c
            JOIN servicios AS s ON c.servicio_id = s.servicio_id
            WHERE c.usuario_id = ?
        `;
        const citas = await query(citasQuery, [id]);

        // Formatear la respuesta
        const usuarioDetalles = {
            id: usuario.usuario_id,
            name: `${usuario.primer_nombre} ${usuario.segundo_nombre || ''} ${usuario.apellido_paterno}`.trim(),
            email: usuario.correo,
            role: usuario.rol,
            status: usuario.validado ? 'Verificado' : 'Sin Verificar',
            appointments: citas.map(cita => ({
                date: new Date(cita.fecha_cita).toLocaleDateString(),
                service: cita.nombre_servicio,
            })),
        };

        res.status(200).json(usuarioDetalles);
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        res.status(500).send('Error al obtener los detalles del usuario.');
    }
};
