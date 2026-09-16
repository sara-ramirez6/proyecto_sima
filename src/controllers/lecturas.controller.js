const lecturaModel = require("../models/lectura.model");

// GET /lecturas
const getAll = async (req, res) => {
    try {
        const lecturas = await lecturaModel.getAll();

        res.json({
            ok: true,
            data: lecturas
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al obtener las lecturas"
        });
    }
};

// GET /lecturas/:id
const getById = async (req, res) => {
    try {
        const lectura = await lecturaModel.getById(req.params.id);

        if (!lectura) {
            return res.status(404).json({
                ok: false,
                msg: "Lectura no encontrada"
            });
        }

        res.json({
            ok: true,
            data: lectura
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al obtener la lectura"
        });
    }
};

// POST /lecturas
const create = async (req, res) => {
    try {
        const {
            id_medidor,
            fecha,
            consumo_litros
        } = req.body;

        if (!id_medidor || !fecha || consumo_litros === undefined) {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const nuevaLectura = await lecturaModel.create(
            id_medidor,
            fecha,
            consumo_litros
        );

        res.status(201).json({
            ok: true,
            data: nuevaLectura
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al crear la lectura"
        });
    }
};

module.exports = {
    getAll,
    getById,
    create
};