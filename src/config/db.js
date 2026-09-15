const mysql = require("mysql2/promise");

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sima_db"
});

module.exports = conexion;