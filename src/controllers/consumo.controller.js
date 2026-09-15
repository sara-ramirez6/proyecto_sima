const consumos = require("../models/consumo.model");
 
// GET /consumo
const obtenerConsumos = (req, res) => {
    res.json(consumos);
};
 
// GET /consumo/:id
const obtenerConsumoPorId = (req, res) => {
    const id = Number(req.params.id);
 
    const consumo = consumos.find(consumo => consumo.id === id);
 
    if (!consumo) {
        return res.status(404).json({
            mensaje: "Consumo no encontrado"
        });
    }
 
    res.json(consumo);
};
 
// POST /consumo
const crearConsumo = (req, res) => {
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
 
    const nuevoConsumo = {
        id: consumos.length + 1,
        id_medidor,
        fecha,
        litros
    };
 
    consumos.push(nuevoConsumo);
 
    res.status(201).json({
        mensaje: "Consumo registrado correctamente",
        consumo: nuevoConsumo
    });
};
 
module.exports = {
    obtenerConsumos,
    obtenerConsumoPorId,
    crearConsumo
};