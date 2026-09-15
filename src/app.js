const express = require("express");

const app = express();

const usuarioRoutes = require("./routes/usuario.routes");


// Permite recibir datos JSON
app.use(express.json());


// Ruta principal de usuarios
app.use("/usuarios", usuarioRoutes);


// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        mensaje: "Proyecto sima funcionando"
    });
});


module.exports = app;