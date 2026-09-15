const conexion = require("../config/db");

// GET /usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const [usuarios] = await conexion.query(
            "SELECT * FROM usuarios"
        );

        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener usuarios",
            error: error.message
        });
    }
};

// GET /usuarios/:id
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const [usuarios] = await conexion.query(
            "SELECT * FROM usuarios WHERE id = ?",
            [id]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.json(usuarios[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener usuario",
            error: error.message
        });
    }
};

// POST /usuarios
const crearUsuario = async (req, res) => {
    try {
        const {
            nombre,
            cedula,
            correo,
            contrasena
        } = req.body;

        if (!nombre || !cedula || !correo || !contrasena) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const [resultado] = await conexion.query(
            `INSERT INTO usuarios
            (nombre, cedula, correo, contrasena)
            VALUES (?, ?, ?, ?)`,
            [nombre, cedula, correo, contrasena]
        );

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            id: resultado.insertId,
            usuario: {
                nombre,
                cedula,
                correo,
                contrasena
            }
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear usuario",
            error: error.message
        });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario
};