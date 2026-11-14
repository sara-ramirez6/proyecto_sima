
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({
    path: process.env.DB_ENV_FILE || '.env'
});

const sslConfig = process.env.DB_SSL_CA
    ? {
        ca: fs.readFileSync(path.resolve(process.env.DB_SSL_CA)),
        rejectUnauthorized: true
    }
    : undefined;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    ...(sslConfig ? { ssl: sslConfig } : {}),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
