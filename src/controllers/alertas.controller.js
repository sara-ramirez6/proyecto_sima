const alertaModel = require("../models/alerta.model");

// GET /alertas
const getAll = async (req, res) => {
    try {
        const alertas = await alertaModel.getAll();

        res.json({
            ok: true,
            data: alertas
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al obtener las alertas"
        });
    }
};

// GET /alertas/:id
const getById = async (req, res) => {
    try {
        const alerta = await alertaModel.getById(req.params.id);

        if (!alerta) {
            return res.status(404).json({
                ok: false,
                msg: "Alerta no encontrada"
            });
        }

        res.json({
            ok: true,
            data: alerta
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al obtener la alerta"
        });
    }
};

// POST /alertas
const create = async (req, res) => {
    try {
        const {
            id_medidor,
            tipo,
            mensaje,
            estado
        } = req.body;

        if (!id_medidor || !tipo || !mensaje || !estado) {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const nuevaAlerta = await alertaModel.create(
            id_medidor,
            tipo,
            mensaje,
            estado
        );

        res.status(201).json({
            ok: true,
            data: nuevaAlerta
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al crear la alerta"
        });
    }
};

module.exports = {
    getAll,
    getById,
    create
};