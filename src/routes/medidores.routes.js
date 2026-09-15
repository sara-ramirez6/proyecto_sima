const express = require("express");

const router = express.Router();
 
const {

    obtenerMedidores,

    obtenerMedidorPorId,

    crearMedidor

} = require("../controllers/medidores.controller");
 
router.get("/", obtenerMedidores);
 
router.get("/:id", obtenerMedidorPorId);
 
router.post("/", crearMedidor);
 
module.exports = router;
 