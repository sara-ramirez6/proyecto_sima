const express = require("express");

const router = express.Router();
 
const {

    obtenerAlertas,

    obtenerAlertaPorId,

    crearAlerta

} = require("../controllers/alertas.controller");
 
router.get("/", obtenerAlertas);
 
router.get("/:id", obtenerAlertaPorId);
 
router.post("/", crearAlerta);
 
module.exports = router;
 