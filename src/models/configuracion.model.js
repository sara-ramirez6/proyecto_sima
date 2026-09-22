const pool = require('../../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, notificaciones, modo_oscuro, unidad_medida
     FROM configuracion_usuario
     ORDER BY id DESC`
  );

  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, notificaciones, modo_oscuro, unidad_medida
     FROM configuracion_usuario
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

const create = async (
  usuario_id,
  notificaciones,
  modo_oscuro,
  unidad_medida
) => {
  const [result] = await pool.query(
    `INSERT INTO configuracion_usuario
    (usuario_id, notificaciones, modo_oscuro, unidad_medida)
    VALUES (?, ?, ?, ?)`,
    [usuario_id, notificaciones, modo_oscuro, unidad_medida]
  );

  return {
    id: result.insertId,
    usuario_id,
    notificaciones,
    modo_oscuro,
    unidad_medida
  };
};

const update = async (
  id,
  usuario_id,
  notificaciones,
  modo_oscuro,
  unidad_medida
) => {
  const [result] = await pool.query(
    `UPDATE configuracion_usuario
     SET usuario_id = ?, notificaciones = ?, modo_oscuro = ?, unidad_medida = ?
     WHERE id = ?`,
    [usuario_id, notificaciones, modo_oscuro, unidad_medida, id]
  );

  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM configuracion_usuario
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