
const express = require("express");
const cors = require("cors");
const app = express();

const usuarioRoutes = require("./routes/usuario.routes");
const authRoutes = require("./routes/auth.routes");
const medidoresRoutes = require("./routes/medidores.routes");
const lecturasRoutes = require("./routes/lecturas.routes");
const consumoRoutes = require("./routes/consumo.routes");
const alertasRoutes = require("./routes/alertas.routes");
const reporteRoutes = require("./routes/reporte.routes");
const facturacionRoutes = require("./routes/facturacion.routes");
const notificacionRoutes = require("./routes/notificacion.routes");
const configuracionRoutes = require("./routes/configuracion.routes");

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Origen no permitido por CORS"));
        }
    },
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

app.use("/usuarios", usuarioRoutes);
app.use("/auth", authRoutes);
app.use("/medidores", medidoresRoutes);
app.use("/lecturas", lecturasRoutes);
app.use("/consumo", consumoRoutes);
app.use("/alertas", alertasRoutes);
app.use("/reportes", reporteRoutes);
app.use("/facturacion", facturacionRoutes);
app.use("/notificacion", notificacionRoutes);
app.use("/configuracion", configuracionRoutes);

app.get("/", (req, res) => {
    res.json({
        mensaje: "PROYECTO SIMA funcionando"
    });
});

module.exports = app;
