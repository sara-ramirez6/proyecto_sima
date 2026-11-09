
const Configuracion = require("../models/configuracion.model");

const getAll = async (req, res) => {
    try {
        const data = await Configuracion.getAll(req.usuario.id);

        res.json({
            ok: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};

const getById = async (req, res) => {
    try {
        const data = await Configuracion.getById(
            req.params.id,
            req.usuario.id
        );

        if (!data) {
            return res.status(404).json({
                ok: false,
                error: "Configuración no encontrada"
            });
        }

        res.json({
            ok: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        const { notificaciones, modo_oscuro, unidad_medida } = req.body;

        if (
            typeof notificaciones !== "boolean" ||
            typeof modo_oscuro !== "boolean" ||
            !["m3", "litros"].includes(unidad_medida)
        ) {
            return res.status(400).json({
                ok: false,
                error: "Los datos de configuración no son válidos"
            });
        }

        const data = await Configuracion.create(
            req.usuario.id,
            notificaciones,
            modo_oscuro,
            unidad_medida
        );

        res.status(201).json({
            ok: true,
            data
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                ok: false,
                error: "Ya existe una configuración para este usuario"
            });
        }

        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const { notificaciones, modo_oscuro, unidad_medida } = req.body;

        if (
            typeof notificaciones !== "boolean" ||
            typeof modo_oscuro !== "boolean" ||
            !["m3", "litros"].includes(unidad_medida)
        ) {
            return res.status(400).json({
                ok: false,
                error: "Los datos de configuración no son válidos"
            });
        }

        const affectedRows = await Configuracion.update(
            req.params.id,
            req.usuario.id,
            notificaciones,
            modo_oscuro,
            unidad_medida
        );

        if (affectedRows === 0) {
            const existente = await Configuracion.getById(
                req.params.id,
                req.usuario.id
            );

            if (!existente) {
                return res.status(404).json({
                    ok: false,
                    error: "Configuración no encontrada"
                });
            }
        }

        res.json({
            ok: true,
            message: "Configuración actualizada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};

const remove = async (req, res) => {
    try {
        const affectedRows = await Configuracion.remove(
            req.params.id,
            req.usuario.id
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                error: "Configuración no encontrada"
            });
        }

        res.json({
            ok: true,
            message: "Configuración eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
