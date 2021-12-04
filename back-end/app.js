const express = require("express");
const app = express();
const sequelize = require("./database/db");
//const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
require("dotenv").config();
require("./database/associations");

// Directorios
const dirs = ['media/banner', 'media/profile'];

// Configuracion
const PORT = process.env.DBPORT;
const HOST = process.env.DBHOST;

// Middlewares
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.static("media"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cross Origin
app.use(cors());

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/usuario", require("./routes/Usuario.routes"));

// Inicialización del servidor
app.listen(PORT, function () {
    console.log(`App corriendo en http://${HOST}:${PORT}`);

    // Conexion a la base de datos
    sequelize
        .authenticate()
        .then(() => {
            for (const dir of dirs) {
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir, { recursive: true });
                }
            }
            console.log("Conexión a la base de datos establecida correctamente.");
        })
        .catch((error) => {
            console.log("Se ha producido un error durante la conexión con la base de datos.", error);
        });
});
