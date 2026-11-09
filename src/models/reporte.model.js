const pool = require("../../config/db");

const getAll = async (usuario_id) => {
    const [rows] = await pool.query(
        `SELECT id, usuario_id, titulo, descripcion, fecha, tipo
         FROM reportes
         WHERE usuario_id = ?
         ORDER BY id DESC`,
        [usuario_id]
    );

    return rows;
};

const getById = async (id, usuario_id) => {
    const [rows] = await pool.query(
        `SELECT id, usuario_id, titulo, descripcion, fecha, tipo
         FROM reportes
         WHERE id = ? AND usuario_id = ?`,
        [id, usuario_id]
    );

    return rows[0];
};

const create = async (usuario_id, titulo, descripcion, tipo) => {
    const [result] = await pool.query(
        `INSERT INTO reportes
         (usuario_id, titulo, descripcion, tipo)
         VALUES (?, ?, ?, ?)`,
        [usuario_id, titulo, descripcion, tipo]
    );

    return {
        id: result.insertId,
        usuario_id,
        titulo,
        descripcion,
        tipo
    };
};

const update = async (id, usuario_id, titulo, descripcion, tipo) => {
    const [result] = await pool.query(
        `UPDATE reportes
         SET titulo = ?, descripcion = ?, tipo = ?
         WHERE id = ? AND usuario_id = ?`,
        [titulo, descripcion, tipo, id, usuario_id]
    );

    return result.affectedRows;
};

const remove = async (id, usuario_id) => {
    const [result] = await pool.query(
        `DELETE FROM reportes
         WHERE id = ? AND usuario_id = ?`,
        [id, usuario_id]
    );

    return result.affectedRows;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};