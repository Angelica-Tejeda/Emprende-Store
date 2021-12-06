const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    //console.log(req.headers);
    if (!req.headers.authorization) {
        res.status(401).json({
            status: "error",
            message: "Acceso no autorizado.",
        });
    } else {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(403).json({
                    status: "error",
                    message:
                        "Permisos insuficientes para realizar esta acción.",
                    error: err,
                });
            } else {
                req.user = decoded.usuario;
                next();
            }
        });
    }
};
