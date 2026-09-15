const express = require("express");
const router = express.Router();
 
const {
    obtenerConsumos,
    obtenerConsumoPorId,
    crearConsumo
} = require("../controllers/consumo.controller");
 
router.get("/", obtenerConsumos);
 
router.get("/:id", obtenerConsumoPorId);
 
router.post("/", crearConsumo);
 
module.exports = router;