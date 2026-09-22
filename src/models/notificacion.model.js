const pool = require('../../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, titulo, mensaje, tipo, leida, fecha
     FROM notificaciones
     ORDER BY id DESC`
  );

  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, titulo, mensaje, tipo, leida, fecha
     FROM notificaciones
     WHERE id = ?`,
    [id]
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
     SET usuario_id = ?, titulo = ?, mensaje = ?, tipo = ?, leida = ?
     WHERE id = ?`,
    [usuario_id, titulo, mensaje, tipo, leida, id]
  );

  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM notificaciones
     WHERE id = ?`,
    [id]
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