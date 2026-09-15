const express = require("express");
 
const app = express();
 
const usuarioRoutes = require("./routes/usuario.routes");
const medidoresRoutes = require("./routes/medidores.routes");
const lecturasRoutes = require("./routes/lecturas.routes");
const consumoRoutes = require("./routes/consumo.routes");
const alertasRoutes = require("./routes/alertas.routes");
 
app.use(express.json());
 
app.use("/usuarios", usuarioRoutes);
app.use("/medidores", medidoresRoutes);
app.use("/lecturas", lecturasRoutes);
app.use("/consumo", consumoRoutes);
app.use("/alertas", alertasRoutes);
 
app.get("/", (req, res) => {
    res.json({
        mensaje: "PROYECTO SIMA funcionando"
    });
});
 
module.exports = app;