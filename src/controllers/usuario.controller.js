const usuarios = require("../models/usuario.model");

// GET /usuarios
const obtenerUsuarios = (req, res) => {
    res.json(usuarios);
};

// GET /usuarios/:id
const obtenerUsuarioPorId = (req, res) => {
    const id = Number(req.params.id);

    const usuario = usuarios.find(usuario => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    res.json(usuario);
};

// POST /usuarios
const crearUsuario = (req, res) => {
    const { nombre, cedula, correo, contrasena } = req.body;

    if (!nombre || !cedula || !correo || !contrasena) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        cedula,
        correo,
        contrasena
    };

    usuarios.push(nuevoUsuario);

    res.status(201).json({
        mensaje: "Usuario creado correctamente",
        usuario: nuevoUsuario
    });
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario
};