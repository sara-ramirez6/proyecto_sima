
const lecturaModel = require('../models/lectura.model');

const getAll = async (req, res) => {
    try {
        const lecturas = await lecturaModel.getAll(req.usuario.id);

        res.json({
            ok: true,
            data: lecturas
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las lecturas'
        });
    }
};

const getById = async (req, res) => {
    try {
        const lectura = await lecturaModel.getById(
            req.params.id,
            req.usuario.id
        );

        if (!lectura) {
            return res.status(404).json({
                ok: false,
                msg: 'Lectura no encontrada'
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
            msg: 'Error al obtener la lectura'
        });
    }
};

const create = async (req, res) => {
    try {
        const { id_medidor, fecha, consumo_litros } = req.body;

        if (!id_medidor || !fecha || consumo_litros === undefined || consumo_litros === '') {
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios'
            });
        }

        if (!Number.isFinite(Number(consumo_litros)) || Number(consumo_litros) < 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El consumo debe ser un número válido y no negativo'
            });
        }

        const nuevaLectura = await lecturaModel.create(
            id_medidor,
            fecha,
            consumo_litros,
            req.usuario.id
        );

        if (!nuevaLectura) {
            return res.status(403).json({
                ok: false,
                msg: 'No puedes registrar lecturas para este medidor'
            });
        }

        res.status(201).json({
            ok: true,
            data: nuevaLectura
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al crear la lectura'
        });
    }
};

module.exports = {
    getAll,
    getById,
    create
};
