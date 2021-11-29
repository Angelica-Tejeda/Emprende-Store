const Usuario = require("../database/models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registrarUsuario = async (req, res) => {
    const prepass = req.body.password;
    if (prepass == null || prepass.length < 8) {
        res.status(400).json({
            status: "error",
            message: "El valor ingresado en el campo contraseña no es válido.",
        });
    } else {
        const password = bcrypt.hashSync(prepass, 10);
        Usuario.create({
            email: req.body.email,
            password: password,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fecha_nacimiento: req.body.fecha_nacimiento,
            celular: req.body.celular,
            rol: req.body.rol,
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
                        message: "Ha ocurrido un error inesperado.",
                        error: err,
                    });
                }
            });
    }
};

exports.iniciarSesion = async (req, res) => {
    Usuario.findOne({
        where: { email: req.body.email },
        attributes: ["id", "password", "rol", "activo"],
        // attributes: { exclude: ["password"] },
    })
        .then((usuario) => {
            if (!usuario) {
                res.status(404).json({
                    status: "error",
                    message: "El email ingresado no ha sido registrado.",
                });
            } else if (usuario.id != 0) {
                res.status(403).json({
                    status: "error",
                    message: "El email ingresado no corresponde con el de un usuario emprendedor.",
                });
            } else {
                if (bcrypt.compareSync(req.body.password, usuario.password)) {
                    const token = jwt.sign(
                        { usuario: usuario },
                        "emprendestore",
                        { expiresIn: "7d" }
                    );
                    res.status(200).json({
                        status: "success",
                        message: "El usuario ha sido identificado con éxito.",
                        usuario: {
                            id: usuario.id,
                            rol: usuario.rol,
                            activo: usuario.activo,
                        },
                        token: token,
                    });
                } else {
                    res.status(401).json({
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
                message: "Ha ocurrido un error inesperado.",
                error: err,
            });
        });
};

exports.iniciarSesionAdmin = async (req, res) => {
    Usuario.findOne({
        where: { email: req.body.email },
        attributes: ["id", "password", "rol", "activo"],
        // attributes: { exclude: ["password"] },
    })
        .then((usuario) => {
            if (!usuario) {
                res.status(404).json({
                    status: "error",
                    message: "El email ingresado no ha sido registrado.",
                });
            } else if (usuario.id != 1) {
                res.status(403).json({
                    status: "error",
                    message: "El email ingresado no corresponde con el de un usuario administrador.",
                });
            } else {
                if (bcrypt.compareSync(req.body.password, usuario.password)) {
                    const token = jwt.sign(
                        { usuario: usuario },
                        "emprendestore",
                        { expiresIn: "7d" }
                    );
                    res.status(200).json({
                        status: "success",
                        message: "El usuario ha sido identificado con éxito.",
                        usuario: {
                            id: usuario.id,
                            rol: usuario.rol,
                            activo: usuario.activo,
                        },
                        token: token,
                    });
                } else {
                    res.status(401).json({
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
                message: "Ha ocurrido un error inesperado.",
                error: err,
            });
        });
};
