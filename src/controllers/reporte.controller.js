const Reporte = require("../models/reporte.model");

const getAll = async (req, res) => {
    try {
        const data = await Reporte.getAll(req.usuario.id);

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
        const data = await Reporte.getById(
            req.params.id,
            req.usuario.id
        );

        if (!data) {
            return res.status(404).json({
                ok: false,
                error: "Reporte no encontrado"
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
        const { titulo, descripcion, tipo } = req.body;

        if (!titulo || !descripcion || !tipo) {
            return res.status(400).json({
                ok: false,
                error: "Todos los campos son obligatorios"
            });
        }

        const data = await Reporte.create(
            req.usuario.id,
            titulo,
            descripcion,
            tipo
        );

        res.status(201).json({
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

const update = async (req, res) => {
    try {
        const { titulo, descripcion, tipo } = req.body;

        if (!titulo || !descripcion || !tipo) {
            return res.status(400).json({
                ok: false,
                error: "Todos los campos son obligatorios"
            });
        }

        const reporte = await Reporte.getById(
            req.params.id,
            req.usuario.id
        );

        if (!reporte) {
            return res.status(404).json({
                ok: false,
                error: "Reporte no encontrado"
            });
        }

        await Reporte.update(
            req.params.id,
            req.usuario.id,
            titulo,
            descripcion,
            tipo
        );

        res.json({
            ok: true,
            message: "Reporte actualizado correctamente"
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
        const affectedRows = await Reporte.remove(
            req.params.id,
            req.usuario.id
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                error: "Reporte no encontrado"
            });
        }

        res.json({
            ok: true,
            message: "Reporte eliminado correctamente"
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