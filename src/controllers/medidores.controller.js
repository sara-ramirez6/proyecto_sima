const medidores = require("../models/medidor.model");
 
// GET /medidores
const obtenerMedidores = (req, res) => {
    res.json(medidores);
};
 
// GET /medidores/:id
const obtenerMedidorPorId = (req, res) => {
    const id = Number(req.params.id);
 
    const medidor = medidores.find(medidor => medidor.id === id);
 
    if (!medidor) {
        return res.status(404).json({
            mensaje: "Medidor no encontrado"
        });
    }
 
    res.json(medidor);
};
 
// POST /medidores
const crearMedidor = (req, res) => {
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
 
    const nuevoMedidor = {
        id: medidores.length + 1,
        id_usuario,
        numero_serie,
        ubicacion,
        estado
    };
 
    medidores.push(nuevoMedidor);
 
    res.status(201).json({
        mensaje: "Medidor creado correctamente",
        medidor: nuevoMedidor
    });
};
 
module.exports = {
    obtenerMedidores,
    obtenerMedidorPorId,
    crearMedidor
};