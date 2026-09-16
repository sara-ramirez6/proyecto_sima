const pool = require('../../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM medidores ORDER BY id DESC'
  );

  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM medidores WHERE id = ?',
    [id]
  );

  return rows[0];
};

const create = async (id_usuario, numero_serie, ubicacion, estado) => {
  const [result] = await pool.query(
    `INSERT INTO medidores
    (id_usuario, numero_serie, ubicacion, estado)
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