const Facturacion = require("../models/facturacion.model");

const getAll = async (req, res) => {
    try {
        const data = await Facturacion.getAll(req.usuario.id);

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
        const data = await Facturacion.getById(
            req.params.id,
            req.usuario.id
        );

        if (!data) {
            return res.status(404).json({
                ok: false,
                error: "Factura no encontrada"
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
        const {
            periodo,
            consumo,
            valor,
            fecha_vencimiento,
            estado
        } = req.body;

        if (
            !periodo ||
            consumo === undefined ||
            valor === undefined ||
            !fecha_vencimiento ||
            !estado
        ) {
            return res.status(400).json({
                ok: false,
                error: "Todos los campos son obligatorios"
            });
        }

        const data = await Facturacion.create(
            req.usuario.id,
            periodo,
            consumo,
            valor,
            fecha_vencimiento,
            estado
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
        const {
            periodo,
            consumo,
            valor,
            fecha_vencimiento,
            estado
        } = req.body;

        if (
            !periodo ||
            consumo === undefined ||
            valor === undefined ||
            !fecha_vencimiento ||
            !estado
        ) {
            return res.status(400).json({
                ok: false,
                error: "Todos los campos son obligatorios"
            });
        }

        const factura = await Facturacion.getById(
            req.params.id,
            req.usuario.id
        );

        if (!factura) {
            return res.status(404).json({
                ok: false,
                error: "Factura no encontrada"
            });
        }

        await Facturacion.update(
            req.params.id,
            req.usuario.id,
            periodo,
            consumo,
            valor,
            fecha_vencimiento,
            estado
        );

        res.json({
            ok: true,
            message: "Factura actualizada correctamente"
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
        const affectedRows = await Facturacion.remove(
            req.params.id,
            req.usuario.id
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                error: "Factura no encontrada"
            });
        }

        res.json({
            ok: true,
            message: "Factura eliminada correctamente"
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