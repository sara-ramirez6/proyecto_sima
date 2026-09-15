const conexion = require("../config/db");

// GET /alertas
const obtenerAlertas = async (req, res) => {
    try {
        const [alertas] = await conexion.query(
            "SELECT * FROM alertas"
        );

        res.json(alertas);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener alertas",
            error: error.message
        });
    }
};

// GET /alertas/:id
const obtenerAlertaPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const [alertas] = await conexion.query(
            "SELECT * FROM alertas WHERE id = ?",
            [id]
        );

        if (alertas.length === 0) {
            return res.status(404).json({
                mensaje: "Alerta no encontrada"
            });
        }

        res.json(alertas[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener alerta",
            error: error.message
        });
    }
};

// POST /alertas
const crearAlerta = async (req, res) => {
    try {
        const {
            id_medidor,
            tipo,
            mensaje,
            estado
        } = req.body;

        if (!id_medidor || !tipo || !mensaje || !estado) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const [resultado] = await conexion.query(
            `INSERT INTO alertas
            (id_medidor, tipo, mensaje, estado)
            VALUES (?, ?, ?, ?)`,
            [id_medidor, tipo, mensaje, estado]
        );

        res.status(201).json({
            mensaje: "Alerta creada correctamente",
            id: resultado.insertId
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear alerta",
            error: error.message
        });
    }
};

module.exports = {
    obtenerAlertas,
    obtenerAlertaPorId,
    crearAlerta
};