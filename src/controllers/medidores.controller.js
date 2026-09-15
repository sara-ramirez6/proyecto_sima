const conexion = require("../config/db");

// GET /medidores
const obtenerMedidores = async (req, res) => {
    try {
        const [medidores] = await conexion.query(
            "SELECT * FROM medidores"
        );

        res.json(medidores);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener medidores",
            error: error.message
        });
    }
};

// GET /medidores/:id
const obtenerMedidorPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const [medidores] = await conexion.query(
            "SELECT * FROM medidores WHERE id = ?",
            [id]
        );

        if (medidores.length === 0) {
            return res.status(404).json({
                mensaje: "Medidor no encontrado"
            });
        }

        res.json(medidores[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener medidor",
            error: error.message
        });
    }
};

// POST /medidores
const crearMedidor = async (req, res) => {
    try {
        const {
            id_usuario,
            numero_serie,
            ubicacion,
            estado
        } = req.body;

        if (!id_usuario || !numero_serie || !ubicacion || !estado) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const [resultado] = await conexion.query(
            `INSERT INTO medidores
            (id_usuario, numero_serie, ubicacion, estado)
            VALUES (?, ?, ?, ?)`,
            [id_usuario, numero_serie, ubicacion, estado]
        );

        res.status(201).json({
            mensaje: "Medidor creado correctamente",
            id: resultado.insertId
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear medidor",
            error: error.message
        });
    }
};

module.exports = {
    obtenerMedidores,
    obtenerMedidorPorId,
    crearMedidor
};