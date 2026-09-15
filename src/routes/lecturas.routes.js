const express = require("express");
const router = express.Router();
 
const {
    obtenerLecturas,
    obtenerLecturaPorId,
    crearLectura
} = require("../controllers/lecturas.controller");
 
router.get("/", obtenerLecturas);
 
router.get("/:id", obtenerLecturaPorId);
 
router.post("/", crearLectura);
 
module.exports = router;