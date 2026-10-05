const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuario.model");

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

        res.json({
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

        res.status(500).json({
            ok: false,
            msg: "Error al iniciar sesión"
        });
    }
};

module.exports = {
    login
};
