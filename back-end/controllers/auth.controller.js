const Usuario = require("../database/models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registrarUsuario = async (req, res) => {
    Usuario.create({
        email: req.body.email,
        password: null,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fecha_nacimiento: req.body.fecha_nacimiento,
        celular: req.body.celular
        ? "593" + req.body.celular.substring(1)
        : null,
        rol: false,
    })
        .then((usuario) => {
            res.status(200).json({
                status: "success",
                message: "El usuario se ha creado con éxito.",
                result: usuario,
            });
        })
        .catch((err) => {
            console.log("ERROR: " + err);
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(403).json({
                    status: "error",
                    message:
                        "El " +
                        err.errors[0].path +
                        " ingresado ya ha sido registrado.",
                    error: err,
                });
            } else if (err.name === "SequelizeValidationError") {
                res.status(400).json({
                    status: "error",
                    message:
                        "El valor ingresado en el campo " +
                        err.errors[0].path +
                        " no es válido.",
                    error: err,
                });
            } else if (err.name === "SequelizeDatabaseError") {
                res.status(400).json({
                    status: "error",
                    message: "Uno de los valores ingresados no es válido.",
                    error: err,
                });
            } else {
                res.status(500).json({
                    status: "error",
                    message:
                        "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                    error: err,
                });
            }
        });
    /*const prepass = req.body.password;
    if (prepass === null || prepass.length < 8) {
        res.status(400).json({
            status: "error",
            message: "El valor ingresado en el campo contraseña no es válido.",
        });
    } else {
        const password = bcrypt.hashSync(prepass, 10);
    }*/
};

exports.iniciarSesionEmpr = async (req, res) => {
    Usuario.findOne({
        where: { email: req.body.email },
        attributes: ["id", "password", "rol", "activo", "verificado"],
    })
        .then((usuario) => {
            if (!usuario) {
                res.status(404).json({
                    status: "error",
                    message: "El email ingresado no ha sido registrado.",
                });
            } else if (usuario.rol) {
                res.status(403).json({
                    status: "error",
                    message:
                        "El email ingresado no corresponde con el de un usuario emprendedor.",
                });
            } else {
                if (bcrypt.compareSync(req.body.password, usuario.password)) {
                    const accessToken = jwt.sign(
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
                    const refreshToken = jwt.sign(
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
                        maxAge: 1000 * 60 * 60
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
                            maxAge: 1000 * 60 * 60
                        })
                        .cookie("usuario_act", usuario.activo, {
                            signed: false,
                            httpOnly: false,
                            secure: process.env.SECURECOOKIE,
                            maxAge: 1000 * 60 * 60
                        })
                        .cookie("usuario_verif", usuario.verificado, {
                            signed: false,
                            httpOnly: false,
                            secure: process.env.SECURECOOKIE,
                            maxAge: 1000 * 60 * 60
                        })
                        .status(200)
                        .json({
                            status: "success",
                            message:
                                "El usuario ha sido identificado con éxito.",
                            usuario: {
                                id: usuario.id,
                                rol: usuario.rol,
                                activo: usuario.activo,
                                verificado: usuario.verificado,
                            },
                        });
                } else {
                    res.status(400).json({
                        status: "error",
                        message: "La contraseña ingresada no es correcta.",
                    });
                }
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
};

exports.iniciarSesionAdmin = async (req, res) => {
    Usuario.findOne({
        where: { email: req.body.email },
        attributes: ["id", "password", "rol", "activo", "verificado"],
    })
        .then((usuario) => {
            if (!usuario) {
                res.status(404).json({
                    status: "error",
                    message: "El email ingresado no ha sido registrado.",
                });
            } else if (!usuario.rol) {
                res.status(403).json({
                    status: "error",
                    message:
                        "El email ingresado no corresponde con el de un usuario administrador.",
                });
            } else {
                if (bcrypt.compareSync(req.body.password, usuario.password)) {
                    const accessToken = jwt.sign(
                        {
                            usuario: {
                                id: usuario.id,
                                rol: usuario.rol,
                                activo: usuario.activo,
                                verificado: verificado,
                            },
                        },
                        process.env.AUTHSECRET,
                        { expiresIn: "1h" }
                    );
                    const refreshToken = jwt.sign(
                        {
                            usuario: {
                                id: usuario.id,
                                rol: usuario.rol,
                                activo: usuario.activo,
                                verificado: verificado,
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
                            maxAge: 1000 * 60 * 60
                        })
                        .cookie("usuario_act", usuario.activo, {
                            signed: false,
                            httpOnly: false,
                            secure: process.env.SECURECOOKIE,
                            maxAge: 1000 * 60 * 60
                        })
                        .cookie("usuario_verif", usuario.verificado, {
                            signed: false,
                            httpOnly: false,
                            secure: process.env.SECURECOOKIE,
                            maxAge: 1000 * 60 * 60
                        })
                        .status(200)
                        .json({
                            status: "success",
                            message:
                                "El usuario ha sido identificado con éxito.",
                            usuario: {
                                id: usuario.id,
                                rol: usuario.rol,
                                activo: usuario.activo,
                                verificado: usuario.verificado
                            },
                        });
                } else {
                    res.status(400).json({
                        status: "error",
                        message: "La contraseña ingresada no es correcta.",
                    });
                }
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
};

exports.cerrarSesion = async (req, res) => {
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
        .status(200)
        .json({
            status: "success",
            message: "La sesión se ha cerrado con éxito.",
        });
};
