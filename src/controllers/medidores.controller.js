const medidorModel = require("../models/medidor.model");

// GET /medidores
const getAll = async (req, res) => {
    try {
        const medidores = await medidorModel.getAll();

        res.json({
            ok: true,
            data: medidores
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al obtener los medidores"
        });
    }
};

// GET /medidores/:id
const getById = async (req, res) => {
    try {
        const medidor = await medidorModel.getById(req.params.id);

        if (!medidor) {
            return res.status(404).json({
                ok: false,
                msg: "Medidor no encontrado"
            });
        }

        res.json({
            ok: true,
            data: medidor
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al obtener el medidor"
        });
    }
};

// POST /medidores
const create = async (req, res) => {
    try {
        const {
            id_usuario,
            numero_serie,
            ubicacion,
            estado
        } = req.body;

        if (!id_usuario || !numero_serie || !ubicacion || !estado) {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const nuevoMedidor = await medidorModel.create(
            id_usuario,
            numero_serie,
            ubicacion,
            estado
        );

        res.status(201).json({
            ok: true,
            data: nuevoMedidor
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: "Error al crear el medidor"
        });
    }
};

module.exports = {
    getAll,
    getById,
    create
};