const express = require("express");
const app = express();
const sequelize = require("./database/db");
//const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./database/associations");

// Directorios
const dirs = ["media/banner", "media/profile", "media/product"];

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
app.use(cookieParser(process.env.COOKIESECRET));
app.use(express.urlencoded({ extended: false }));

// Cross Origin
app.use(
    cors({
        //origin: "http://localhost:4200",
        credentials: true,
    })
);

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/comentario", require("./routes/Comentario.routes"));
app.use("/api/publicacion", require("./routes/Publicacion.routes"));
app.use("/api/usuario", require("./routes/Usuario.routes"));
app.use("/api/visita", require("./routes/Visita.routes"));

// Inicialización del servidor
app.listen(PORT, function () {
    console.log(`App corriendo en http://${HOST}:${PORT}`);

    // Conexion a la base de datos
    sequelize
        .authenticate()
        .then(() => {
            for (const dir of dirs) {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
            }
            console.log(
                "Conexión a la base de datos establecida correctamente."
            );
        })
        .catch((error) => {
            console.log(
                "Se ha producido un error durante la conexión con la base de datos.",
                error
            );
        });
});
