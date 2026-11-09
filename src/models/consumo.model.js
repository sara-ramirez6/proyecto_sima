const pool = require('../../config/db');

const getAll = async (id_usuario) => {
    const [rows] = await pool.query(
        `SELECT c.id, c.id_medidor, c.fecha, c.litros,
                m.numero_serie, m.ubicacion
         FROM consumo c
         INNER JOIN medidores m ON c.id_medidor = m.id
         WHERE m.id_usuario = ?
         ORDER BY c.fecha DESC, c.id DESC`,
        [id_usuario]
    );

    return rows;
};

const getById = async (id, id_usuario) => {
    const [rows] = await pool.query(
        `SELECT c.id, c.id_medidor, c.fecha, c.litros,
                m.numero_serie, m.ubicacion
         FROM consumo c
         INNER JOIN medidores m ON c.id_medidor = m.id
         WHERE c.id = ? AND m.id_usuario = ?`,
        [id, id_usuario]
    );

    return rows[0];
};

const create = async (id_medidor, fecha, litros, id_usuario) => {
    const [medidores] = await pool.query(
        'SELECT id FROM medidores WHERE id = ? AND id_usuario = ?',
        [id_medidor, id_usuario]
    );

    if (medidores.length === 0) {
        return null;
    }

    const [result] = await pool.query(
        `INSERT INTO consumo (id_medidor, fecha, litros)
         VALUES (?, ?, ?)`,
        [id_medidor, fecha, litros]
    );

    return {
        id: result.insertId,
        id_medidor,
        fecha,
        litros
    };
};

module.exports = {
    getAll,
    getById,
    create
};
