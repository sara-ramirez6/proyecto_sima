const pool = require('../../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, titulo, descripcion, fecha, tipo
     FROM reportes
     ORDER BY id DESC`
  );

  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, titulo, descripcion, fecha, tipo
     FROM reportes
     WHERE id = ?`,
    [id]
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
     SET usuario_id = ?, titulo = ?, descripcion = ?, tipo = ?
     WHERE id = ?`,
    [usuario_id, titulo, descripcion, tipo, id]
  );

  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM reportes
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