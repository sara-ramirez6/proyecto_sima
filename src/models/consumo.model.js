const pool = require('../../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM consumo ORDER BY id DESC'
  );

  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM consumo WHERE id = ?',
    [id]
  );

  return rows[0];
};

const create = async (id_medidor, fecha, litros) => {
  const [result] = await pool.query(
    `INSERT INTO consumo
    (id_medidor, fecha, litros)
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