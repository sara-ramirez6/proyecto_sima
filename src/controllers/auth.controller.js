
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuario.model");

// POST /auth/register
const register = async (req, res) => {
    try {
        const { nombre, cedula, correo, contrasena } = req.body;

        if (!nombre || !cedula || !correo || !contrasena) {
            return res.status(400).json({
                ok: false,
                msg: "Nombre, cédula, correo y contraseña son obligatorios"
            });
        }

        // Verificar si el correo ya está registrado
        const usuarioExistente = await usuarioModel.login(correo);

        if (usuarioExistente) {
            return res.status(409).json({
                ok: false,
                msg: "El correo ya está registrado"
            });
        }

        // Crear el usuario
        const nuevoUsuario = await usuarioModel.create(
            nombre,
            cedula,
            correo,
            contrasena
        );

        return res.status(201).json({
            ok: true,
            msg: "Usuario registrado exitosamente",
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: "Error al registrar el usuario"
        });
    }
};

// POST /auth/login
const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({
                ok: false,
                msg: "Correo y contraseña son obligatorios"
            });
        }

        const usuario = await usuarioModel.login(correo);

        if (!usuario || usuario.contrasena !== contrasena) {
            return res.status(401).json({
                ok: false,
                msg: "Credenciales inválidas"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                correo: usuario.correo,
                nombre: usuario.nombre
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "2h"
            }
        );

        return res.json({
            ok: true,
            msg: "Inicio de sesión exitoso",
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: "Error al iniciar sesión"
        });
    }
};

module.exports = {
    login,
    register
};
