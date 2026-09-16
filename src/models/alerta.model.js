const pool = require('../../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM alertas ORDER BY id DESC'
  );

  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM alertas WHERE id = ?',
    [id]
  );

  return rows[0];
};

const create = async (id_medidor, tipo, mensaje, estado) => {
  const [result] = await pool.query(
    `INSERT INTO alertas
    (id_medidor, tipo, mensaje, estado)
    VALUES (?, ?, ?, ?)`,
    [id_medidor, tipo, mensaje, estado]
  );

  return {
    id: result.insertId,
    id_medidor,
    tipo,
    mensaje,
    estado
  };
};

module.exports = {
  getAll,
  getById,
  create
};