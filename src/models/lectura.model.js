
const pool = require('../../config/db');

const getAll = async (id_usuario) => {
    const [rows] = await pool.query(
        `SELECT l.id, l.id_medidor, l.fecha, l.consumo_litros,
                m.numero_serie, m.ubicacion
         FROM lecturas l
         INNER JOIN medidores m ON l.id_medidor = m.id
         WHERE m.id_usuario = ?
         ORDER BY l.fecha DESC, l.id DESC`,
        [id_usuario]
    );

    return rows;
};

const getById = async (id, id_usuario) => {
    const [rows] = await pool.query(
        `SELECT l.id, l.id_medidor, l.fecha, l.consumo_litros,
                m.numero_serie, m.ubicacion
         FROM lecturas l
         INNER JOIN medidores m ON l.id_medidor = m.id
         WHERE l.id = ? AND m.id_usuario = ?`,
        [id, id_usuario]
    );

    return rows[0];
};

const create = async (id_medidor, fecha, consumo_litros, id_usuario) => {
    const [medidores] = await pool.query(
        'SELECT id FROM medidores WHERE id = ? AND id_usuario = ?',
        [id_medidor, id_usuario]
    );

    if (medidores.length === 0) {
        return null;
    }

    const [result] = await pool.query(
        `INSERT INTO lecturas (id_medidor, fecha, consumo_litros)
         VALUES (?, ?, ?)`,
        [id_medidor, fecha, consumo_litros]
    );

    return {
        id: result.insertId,
        id_medidor,
        fecha,
        consumo_litros
    };
};

module.exports = {
    getAll,
    getById,
    create
};
