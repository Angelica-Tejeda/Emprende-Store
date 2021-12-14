const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.signedCookies.accessToken;
    if (!token) {
        res.status(401).json({
            status: "error",
            message: "Acceso no autorizado. Por favor inicie sesión.",
        });
    } else {
        //let token = req.headers.authorization.split(" ")[1];
        console.log(token);
        console.log(cookieParser.signedCookie("s%3A" + token, process.env.COOKIESECRET));
        jwt.verify(token, process.env.AUTHSECRET, (err, decoded) => {
            if (err) {
                if (err.name == "TokenExpiredError") {
                    console.log(err);
                    res.status(401).json({
                        status: "error",
                        message:
                            "El Token de autenticación ha caducado.",
                        error: err,
                    });
                } else {
                    console.log(err);
                    res.status(403).json({
                        status: "error",
                        message:
                            "Permisos insuficientes para realizar esta acción.",
                        error: err,
                    });
                }
            } else {
                req.user = decoded.usuario;
                console.log(req.user);
                next();
            }
        });
    }
};
