const Usuario = require("../database/models/Usuario");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    let accessToken = req.signedCookies.accessToken;
    let refreshToken = req.signedCookies.refreshToken;
    const user_id = req.cookies.usuario_id;
    if (!refreshToken || !user_id) {
        res.cookie("accessToken", null, {
            signed: true,
            httpOnly: true,
            secure: process.env.SECURECOOKIE,
            maxAge: 1,
        })
            .cookie("refreshToken", null, {
                signed: true,
                httpOnly: true,
                secure: process.env.SECURECOOKIE,
                maxAge: 1,
            })
            .cookie("usuario_id", null, {
                signed: false,
                httpOnly: false,
                secure: process.env.SECURECOOKIE,
                maxAge: 1,
            })
            .cookie("usuario_rol", null, {
                signed: false,
                httpOnly: false,
                secure: process.env.SECURECOOKIE,
                maxAge: 1,
            })
            .cookie("usuario_act", null, {
                signed: false,
                httpOnly: false,
                secure: process.env.SECURECOOKIE,
                maxAge: 1,
            })
            .cookie("usuario_verif", null, {
                signed: false,
                httpOnly: false,
                secure: process.env.SECURECOOKIE,
                maxAge: 1,
            })
            .status(401)
            .json({
                status: "error",
                message: "Acceso no autorizado. Por favor inicie sesión.",
            });
    } else if (!accessToken) {
        jwt.verify(refreshToken, process.env.REFRESHSECRET, (err, decoded) => {
            if (err) {
                if (err.name == "TokenExpiredError") {
                    console.log(err);
                    res.cookie("accessToken", null, {
                        signed: true,
                        httpOnly: true,
                        secure: process.env.SECURECOOKIE,
                        maxAge: 1,
                    })
                        .cookie("refreshToken", null, {
                            signed: true,
                            httpOnly: true,
                            secure: process.env.SECURECOOKIE,
                            maxAge: 1,
                        })
                        .cookie("usuario_id", null, {
                            signed: false,
                            httpOnly: false,
                            secure: process.env.SECURECOOKIE,
                            maxAge: 1,
                        })
                        .cookie("usuario_rol", null, {
                            signed: false,
                            httpOnly: false,
                            secure: process.env.SECURECOOKIE,
                            maxAge: 1,
                        })
                        .cookie("usuario_act", null, {
                            signed: false,
                            httpOnly: false,
                            secure: process.env.SECURECOOKIE,
                            maxAge: 1,
                        })
                        .cookie("usuario_verif", null, {
                            signed: false,
                            httpOnly: false,
                            secure: process.env.SECURECOOKIE,
                            maxAge: 1,
                        })
                        .status(401)
                        .json({
                            status: "error",
                            message: "El Token de autenticación ha caducado.",
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
            } else if (decoded.usuario.id != user_id) {
                res.cookie("accessToken", null, {
                    signed: true,
                    httpOnly: true,
                    secure: process.env.SECURECOOKIE,
                    maxAge: 1,
                })
                    .cookie("refreshToken", null, {
                        signed: true,
                        httpOnly: true,
                        secure: process.env.SECURECOOKIE,
                        maxAge: 1,
                    })
                    .cookie("usuario_id", null, {
                        signed: false,
                        httpOnly: false,
                        secure: process.env.SECURECOOKIE,
                        maxAge: 1,
                    })
                    .cookie("usuario_rol", null, {
                        signed: false,
                        httpOnly: false,
                        secure: process.env.SECURECOOKIE,
                        maxAge: 1,
                    })
                    .cookie("usuario_act", null, {
                        signed: false,
                        httpOnly: false,
                        secure: process.env.SECURECOOKIE,
                        maxAge: 1,
                    })
                    .cookie("usuario_verif", null, {
                        signed: false,
                        httpOnly: false,
                        secure: process.env.SECURECOOKIE,
                        maxAge: 1,
                    })
                    .status(401)
                    .json({
                        status: "error",
                        message:
                            "Ha ocurrido un error de atenticación, por favor inicie sesión nuevamente.",
                        error: err,
                    });
            } else {
                Usuario.findByPk(decoded.usuario.id, {
                    attributes: ["id", "rol", "activo", "verificado"],
                })
                    .then((usuario) => {
                        if (!usuario) {
                            res.status(404).json({
                                status: "error",
                                message:
                                    "Ha ocurrido un error de atenticación, por favor inicie sesión nuevamente.",
                            });
                        } else {
                            accessToken = jwt.sign(
                                {
                                    usuario: {
                                        id: usuario.id,
                                        rol: usuario.rol,
                                        activo: usuario.activo,
                                        verificado: usuario.verificado,
                                    },
                                },
                                process.env.AUTHSECRET,
                                { expiresIn: "1h" }
                            );
                            refreshToken = jwt.sign(
                                {
                                    usuario: {
                                        id: usuario.id,
                                        rol: usuario.rol,
                                        activo: usuario.activo,
                                        verificado: usuario.verificado,
                                    },
                                },
                                process.env.REFRESHSECRET,
                                { expiresIn: "7d" }
                            );
                            res.cookie("accessToken", accessToken, {
                                signed: true,
                                httpOnly: true,
                                secure: process.env.SECURECOOKIE,
                                maxAge: 1000 * 60 * 60,
                            })
                                .cookie("refreshToken", refreshToken, {
                                    signed: true,
                                    httpOnly: true,
                                    secure: process.env.SECURECOOKIE,
                                    maxAge: 1000 * 60 * 60 * 24 * 7,
                                })
                                .cookie("usuario_id", usuario.id, {
                                    signed: false,
                                    httpOnly: false,
                                    secure: process.env.SECURECOOKIE,
                                    maxAge: 1000 * 60 * 60 * 24 * 7,
                                })
                                .cookie("usuario_rol", usuario.rol, {
                                    signed: false,
                                    httpOnly: false,
                                    secure: process.env.SECURECOOKIE,
                                    maxAge: 1000 * 60 * 60,
                                })
                                .cookie("usuario_act", usuario.activo, {
                                    signed: false,
                                    httpOnly: false,
                                    secure: process.env.SECURECOOKIE,
                                    maxAge: 1000 * 60 * 60,
                                })
                                .cookie("usuario_verif", usuario.verificado, {
                                    signed: false,
                                    httpOnly: false,
                                    secure: process.env.SECURECOOKIE,
                                    maxAge: 1000 * 60 * 60,
                                });
                            req.user = usuario;
                            next();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            status: "error",
                            message:
                                "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                            error: err,
                        });
                    });
            }
        });
    } else {
        jwt.verify(accessToken, process.env.AUTHSECRET, (err, decoded) => {
            if (err) {
                if (err.name == "TokenExpiredError") {
                    console.log(err);
                    res.status(401).json({
                        status: "error",
                        message: "El Token de autenticación ha caducado.",
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
                next();
            }
        });
    }
};
