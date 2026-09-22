const pool = require('../../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, periodo, consumo, valor, fecha_vencimiento, estado
     FROM facturacion
     ORDER BY id DESC`
  );

  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, usuario_id, periodo, consumo, valor, fecha_vencimiento, estado
     FROM facturacion
     WHERE id = ?`,
    [id]
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
    [
      usuario_id,
      periodo,
      consumo,
      valor,
      fecha_vencimiento,
      estado
    ]
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
     SET usuario_id = ?, periodo = ?, consumo = ?, valor = ?,
         fecha_vencimiento = ?, estado = ?
     WHERE id = ?`,
    [
      usuario_id,
      periodo,
      consumo,
      valor,
      fecha_vencimiento,
      estado,
      id
    ]
  );

  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM facturacion
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