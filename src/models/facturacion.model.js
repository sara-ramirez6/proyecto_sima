const pool = require("../../config/db");

const getAll = async (usuario_id) => {
    const [rows] = await pool.query(
        `SELECT id, usuario_id, periodo, consumo, valor,
                fecha_vencimiento, estado
         FROM facturacion
         WHERE usuario_id = ?
         ORDER BY id DESC`,
        [usuario_id]
    );

    return rows;
};

const getById = async (id, usuario_id) => {
    const [rows] = await pool.query(
        `SELECT id, usuario_id, periodo, consumo, valor,
                fecha_vencimiento, estado
         FROM facturacion
         WHERE id = ? AND usuario_id = ?`,
        [id, usuario_id]
    );

    return rows[0];
};

const create = async (
    usuario_id,
    periodo,
    consumo,
    valor,
    fecha_vencimiento,
    estado
) => {
    const [result] = await pool.query(
        `INSERT INTO facturacion
         (usuario_id, periodo, consumo, valor, fecha_vencimiento, estado)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [usuario_id, periodo, consumo, valor, fecha_vencimiento, estado]
    );

    return {
        id: result.insertId,
        usuario_id,
        periodo,
        consumo,
        valor,
        fecha_vencimiento,
        estado
    };
};

const update = async (
    id,
    usuario_id,
    periodo,
    consumo,
    valor,
    fecha_vencimiento,
    estado
) => {
    const [result] = await pool.query(
        `UPDATE facturacion
         SET periodo = ?, consumo = ?, valor = ?,
             fecha_vencimiento = ?, estado = ?
         WHERE id = ? AND usuario_id = ?`,
        [
            periodo,
            consumo,
            valor,
            fecha_vencimiento,
            estado,
            id,
            usuario_id
        ]
    );

    return result.affectedRows;
};

const remove = async (id, usuario_id) => {
    const [result] = await pool.query(
        `DELETE FROM facturacion
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