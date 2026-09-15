const conexion = require("../config/db");

// GET /consumo
const obtenerConsumos = async (req, res) => {
    try {
        const [consumos] = await conexion.query(
            "SELECT * FROM consumo"
        );

        res.json(consumos);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener consumos",
            error: error.message
        });
    }
};

// GET /consumo/:id
const obtenerConsumoPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const [consumos] = await conexion.query(
            "SELECT * FROM consumo WHERE id = ?",
            [id]
        );

        if (consumos.length === 0) {
            return res.status(404).json({
                mensaje: "Consumo no encontrado"
            });
        }

        res.json(consumos[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener consumo",
            error: error.message
        });
    }
};

// POST /consumo
const crearConsumo = async (req, res) => {
    try {
        const {
            id_medidor,
            fecha,
            litros
        } = req.body;

        if (!id_medidor || !fecha || litros === undefined) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const [resultado] = await conexion.query(
            `INSERT INTO consumo
            (id_medidor, fecha, litros)
            VALUES (?, ?, ?)`,
            [id_medidor, fecha, litros]
        );

        res.status(201).json({
            mensaje: "Consumo registrado correctamente",
            id: resultado.insertId
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al registrar consumo",
            error: error.message
        });
    }
};

module.exports = {
    obtenerConsumos,
    obtenerConsumoPorId,
    crearConsumo
};