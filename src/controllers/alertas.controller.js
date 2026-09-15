const alertas = require("../models/alerta.model");
 
// GET /alertas
const obtenerAlertas = (req, res) => {
    res.json(alertas);
};
 
// GET /alertas/:id
const obtenerAlertaPorId = (req, res) => {
    const id = Number(req.params.id);
 
    const alerta = alertas.find(alerta => alerta.id === id);
 
    if (!alerta) {
        return res.status(404).json({
            mensaje: "Alerta no encontrada"
        });
    }
 
    res.json(alerta);
};
 
// POST /alertas
const crearAlerta = (req, res) => {
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
 
    const nuevaAlerta = {
        id: alertas.length + 1,
        id_medidor,
        tipo,
        mensaje,
        estado
    };
 
    alertas.push(nuevaAlerta);
 
    res.status(201).json({
        mensaje: "Alerta creada correctamente",
        alerta: nuevaAlerta
    });
};
 
module.exports = {
    obtenerAlertas,
    obtenerAlertaPorId,
    crearAlerta
};