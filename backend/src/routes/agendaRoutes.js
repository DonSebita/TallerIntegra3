const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
const { promisify } = require('util');
const query = promisify(db.query).bind(db);

// Endpoint para obtener los horarios disponibles de un profesional
router.get('/horas-disponibles/:profesional_id', async (req, res) => {
    const { profesional_id } = req.params;

    try {
        const horariosDisponibles = await query(`
            SELECT agenda_id, dia, hora_inicio, hora_fin 
            FROM agenda 
            WHERE profesional_id = ? AND disponible = 1
            ORDER BY dia, hora_inicio
        `, [profesional_id]);

        res.json(horariosDisponibles);
    } catch (error) {
        console.error('Error al obtener horarios disponibles:', error);
        res.status(500).json({ message: 'Error al obtener horarios disponibles' });
    }
});

module.exports = router;
