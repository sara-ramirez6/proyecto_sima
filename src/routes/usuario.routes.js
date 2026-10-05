const express = require("express");

const router = express.Router();

const {
    getAll,
    getById,
    create
} = require("../controllers/usuario.controller");

const { verificarToken } = require("../middleware/authMiddleware");

router.get("/", verificarToken, getAll);

router.get("/:id", verificarToken, getById);

router.post("/", create);

module.exports = router;