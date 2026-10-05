const pool = require('../../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    `SELECT id, nombre, cedula, correo
     FROM usuarios
     ORDER BY id DESC`
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, nombre, cedula, correo
     FROM usuarios
     WHERE id = ?`,
    [id]
  );
  return rows[0];
};

const create = async (nombre, cedula, correo, contrasena) => {
  const [result] = await pool.query(
    `INSERT INTO usuarios 
    (nombre, cedula, correo, contrasena)
    VALUES (?, ?, ?, ?)`,
    [nombre, cedula, correo, contrasena]
  );

  return {
    id: result.insertId,
    nombre,
    cedula,
    correo
  };
};

const login = async (correo) => {
  const [rows] = await pool.query(
    `SELECT id, nombre, cedula, correo, contrasena
     FROM usuarios
     WHERE correo = ?`,
    [correo]
  );

  return rows[0];
};

const update = async (id, nombre, cedula, correo, contrasena) => {
  const [result] = await pool.query(
    `UPDATE usuarios
     SET nombre = ?, cedula = ?, correo = ?, contrasena = ?
     WHERE id = ?`,
    [nombre, cedula, correo, contrasena, id]
  );

  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM usuarios WHERE id = ?',
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAll,
  getById,
  create,
  login,
  update,
  remove
};
