
const pool = require('../../config/db');

const getAll = async (id_usuario) => {
    const [rows] = await pool.query(
        `SELECT a.id, a.id_medidor, a.tipo, a.mensaje, a.estado,
                m.numero_serie, m.ubicacion
         FROM alertas a
         INNER JOIN medidores m ON a.id_medidor = m.id
         WHERE m.id_usuario = ?
         ORDER BY a.id DESC`,
        [id_usuario]
    );

    return rows;
};

const getById = async (id, id_usuario) => {
    const [rows] = await pool.query(
        `SELECT a.id, a.id_medidor, a.tipo, a.mensaje, a.estado,
                m.numero_serie, m.ubicacion
         FROM alertas a
         INNER JOIN medidores m ON a.id_medidor = m.id
         WHERE a.id = ? AND m.id_usuario = ?`,
        [id, id_usuario]
    );

    return rows[0];
};

const create = async (id_medidor, tipo, mensaje, estado, id_usuario) => {
    const [medidores] = await pool.query(
        'SELECT id FROM medidores WHERE id = ? AND id_usuario = ?',
        [id_medidor, id_usuario]
    );

    if (medidores.length === 0) {
        return null;
    }

    const [result] = await pool.query(
        `INSERT INTO alertas (id_medidor, tipo, mensaje, estado)
         VALUES (?, ?, ?, ?)`,
        [id_medidor, tipo, mensaje, estado]
    );

    return {
        id: result.insertId,
        id_medidor,
        tipo,
        mensaje,
        estado
    };
};

module.exports = {
    getAll,
    getById,
    create
};
