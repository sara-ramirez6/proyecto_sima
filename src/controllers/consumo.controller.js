const consumoModel = require("../models/consumo.model");

// GET /consumo
const getAll = async (req, res) => {
    try {
        const consumos = await consumoModel.getAll();

        res.json({
            ok: true,
            data: consumos
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al obtener los consumos"
        });
    }
};

// GET /consumo/:id
const getById = async (req, res) => {
    try {
        const consumo = await consumoModel.getById(req.params.id);

        if (!consumo) {
            return res.status(404).json({
                ok: false,
                msg: "Consumo no encontrado"
            });
        }

        res.json({
            ok: true,
            data: consumo
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al obtener el consumo"
        });
    }
};

// POST /consumo
const create = async (req, res) => {
    try {
        const {
            id_medidor,
            fecha,
            litros
        } = req.body;

        if (!id_medidor || !fecha || litros === undefined) {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const nuevoConsumo = await consumoModel.create(
            id_medidor,
            fecha,
            litros
        );

        res.status(201).json({
            ok: true,
            data: nuevoConsumo
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al crear el consumo"
        });
    }
};

module.exports = {
    getAll,
    getById,
    create
};