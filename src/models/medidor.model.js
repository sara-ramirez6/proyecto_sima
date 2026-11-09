
const pool = require('../../config/db');

const getAll = async (id_usuario) => {
    const [rows] = await pool.query(
        'SELECT * FROM medidores WHERE id_usuario = ? ORDER BY id DESC',
        [id_usuario]
    );

    return rows;
};

const getById = async (id, id_usuario) => {
    const [rows] = await pool.query(
        'SELECT * FROM medidores WHERE id = ? AND id_usuario = ?',
        [id, id_usuario]
    );

    return rows[0];
};

const create = async (id_usuario, numero_serie, ubicacion, estado) => {
    const [result] = await pool.query(
        `INSERT INTO medidores (id_usuario, numero_serie, ubicacion, estado)
         VALUES (?, ?, ?, ?)`,
        [id_usuario, numero_serie, ubicacion, estado]
    );

    return {
        id: result.insertId,
        id_usuario,
        numero_serie,
        ubicacion,
        estado
    };
};

module.exports = {
    getAll,
    getById,
    create
};
