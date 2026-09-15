const lecturas = require("../models/lectura.model");
 
// GET /lecturas

const obtenerLecturas = (req, res) => {

    res.json(lecturas);

};
 
// GET /lecturas/:id

const obtenerLecturaPorId = (req, res) => {

    const id = Number(req.params.id);
 
    const lectura = lecturas.find(lectura => lectura.id === id);
 
    if (!lectura) {

        return res.status(404).json({

            mensaje: "Lectura no encontrada"

        });

    }
 
    res.json(lectura);

};
 
// POST /lecturas

const crearLectura = (req, res) => {

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
 
    const nuevaLectura = {

        id: lecturas.length + 1,

        id_medidor,

        fecha,

        consumo_litros

    };
 
    lecturas.push(nuevaLectura);
 
    res.status(201).json({

        mensaje: "Lectura creada correctamente",

        lectura: nuevaLectura

    });

};
 
module.exports = {

    obtenerLecturas,

    obtenerLecturaPorId,

    crearLectura

};
 