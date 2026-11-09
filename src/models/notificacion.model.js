
const pool = require("../../config/db");

const getAll = async (usuario_id) => {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, titulo, mensaje, tipo, leida, fecha
     FROM notificaciones
     WHERE usuario_id = ?
     ORDER BY id DESC`,
    [usuario_id]
  );

  return rows;
};

const getById = async (id, usuario_id) => {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, titulo, mensaje, tipo, leida, fecha
     FROM notificaciones
     WHERE id = ? AND usuario_id = ?`,
    [id, usuario_id]
  );

  return rows[0];
};

const create = async (usuario_id, titulo, mensaje, tipo, leida) => {
  const [result] = await pool.query(
    `INSERT INTO notificaciones
    (usuario_id, titulo, mensaje, tipo, leida)
    VALUES (?, ?, ?, ?, ?)`,
    [usuario_id, titulo, mensaje, tipo, leida]
  );

  return {
    id: result.insertId,
    usuario_id,
    titulo,
    mensaje,
    tipo,
    leida
  };
};

const update = async (id, usuario_id, titulo, mensaje, tipo, leida) => {
  const [result] = await pool.query(
    `UPDATE notificaciones
     SET titulo = ?, mensaje = ?, tipo = ?, leida = ?
     WHERE id = ? AND usuario_id = ?`,
    [titulo, mensaje, tipo, leida, id, usuario_id]
  );

  return result.affectedRows;
};

const remove = async (id, usuario_id) => {
  const [result] = await pool.query(
    `DELETE FROM notificaciones
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
