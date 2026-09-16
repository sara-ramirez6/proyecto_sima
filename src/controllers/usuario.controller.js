const usuarioModel = require("../models/usuario.model");

// GET /usuarios
const getAll = async (req, res) => {
    try {
        const usuarios = await usuarioModel.getAll();

        res.json({
            ok: true,
            data: usuarios
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al obtener los usuarios"
        });
    }
};

// GET /usuarios/:id
const getById = async (req, res) => {
    try {
        const usuario = await usuarioModel.getById(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "No encontrado"
            });
        }

        res.json({
            ok: true,
            data: usuario
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al obtener el usuario"
        });
    }
};

// POST /usuarios
const create = async (req, res) => {
    try {
        const { nombre, cedula, correo, contrasena } = req.body;

        if (!nombre || !cedula || !correo || !contrasena) {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const nuevoUsuario = await usuarioModel.create(
            nombre,
            cedula,
            correo,
            contrasena
        );

        res.status(201).json({
            ok: true,
            data: nuevoUsuario
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario"
        });
    }
};

module.exports = {
    getAll,
    getById,
    create
};