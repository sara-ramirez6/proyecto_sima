const conexion = require("../config/db");

// GET /lecturas
const obtenerLecturas = async (req, res) => {
    try {
        const [lecturas] = await conexion.query(
            "SELECT * FROM lecturas"
        );

        res.json(lecturas);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener lecturas",
            error: error.message
        });
    }
};

// GET /lecturas/:id
const obtenerLecturaPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const [lecturas] = await conexion.query(
            "SELECT * FROM lecturas WHERE id = ?",
            [id]
        );

        if (lecturas.length === 0) {
            return res.status(404).json({
                mensaje: "Lectura no encontrada"
            });
        }

        res.json(lecturas[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener lectura",
            error: error.message
        });
    }
};

// POST /lecturas
const crearLectura = async (req, res) => {
    try {
        const {
            id_medidor,
            fecha,
            consumo_litros
        } = req.body;

        if (!id_medidor || !fecha || consumo_litros === undefined) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const [resultado] = await conexion.query(
            `INSERT INTO lecturas
            (id_medidor, fecha, consumo_litros)
            VALUES (?, ?, ?)`,
            [id_medidor, fecha, consumo_litros]
        );

        res.status(201).json({
            mensaje: "Lectura creada correctamente",
            id: resultado.insertId
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear lectura",
            error: error.message
        });
    }
};

module.exports = {
    obtenerLecturas,
    obtenerLecturaPorId,
    crearLectura
};