const Usuario = require("../database/models/Usuario");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const { CommandCompleteMessage } = require("pg-protocol/dist/messages");

//TODO: Revisar los endpoint que devuelven más datos de los necesarios

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./media/" + req.body.type + "/");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.type + "-" + req.params.userId + ".png");
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/webp"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadImage = multer({
    storage,
    fileFilter,
});

exports.getAllUsuarios = async (req, res) => {
    Usuario.findAndCountAll({
        limit: req.query.limit ? req.query.limit : undefined,
        offset:
            req.query.page && req.query.limit
                ? req.query.page * req.query.limit
                : undefined,
        order: [
            [
                req.query.field ? req.query.field : "creado",
                req.query.order ? req.query.order : "DESC",
            ],
            ["id", req.query.order ? req.query.order : "DESC"],
        ],
        where: {
            rol: false,
            activo:
                req.query.isActivo !== undefined && req.query.isActivo !== null
                    ? req.query.isActivo
                    : undefined,
            verificado:
                req.query.isVerificado !== undefined &&
                req.query.isVerificado !== null
                    ? req.query.isVerificado
                    : undefined,
        },
        attributes: { exclude: ["password", "rol"] },
    })
        .then((usuarios) => {
            if (usuarios.count > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Usuarios obtenidos con éxito.",
                    result: usuarios,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Usuarios no encontrados.",
                    result: usuarios,
                });
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

exports.getMinUsuarioById = async (req, res) => {
    Usuario.findByPk(req.params.userId, {
        attributes: ["id", "nombre", "foto_perfil", "activo", "verificado"],
    })
        .then((usuario) => {
            if (usuario) {
                res.status(200).json({
                    status: "success",
                    message: "Usuario obtenido con éxito.",
                    result: usuario,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Usuario no encontrado.",
                    result: usuario,
                });
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

exports.getOwnUsuarioById = async (req, res) => {
    Usuario.findByPk(req.params.userId, {
        attributes: { exclude: ["password", "rol"] },
    })
        .then((usuario) => {
            if (usuario) {
                res.status(200).json({
                    status: "success",
                    message: "Usuario obtenido con éxito.",
                    result: usuario,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Usuario no encontrado.",
                    result: usuario,
                });
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

exports.getUsuarioById = async (req, res) => {
    Usuario.findOne({
        where: {
            id: req.params.userId,
            rol: false,
            activo: true,
            verificado: true,
        },
        attributes: {
            exclude: ["password", "rol", "activo", "verificado", "modificado"],
        },
    })
        .then((usuario) => {
            if (usuario) {
                res.status(200).json({
                    status: "success",
                    message: "Usuario obtenido con éxito.",
                    result: usuario,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Usuario no encontrado.",
                    result: usuario,
                });
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

exports.updateUsuarioActivo = async (req, res) => {
    Usuario.update(
        {
            activo: req.body.activo,
        },
        {
            where: { id: req.params.userId },
        }
    )
        .then((result) => {
            let texto = "desactivado";
            if (req.body.activo) {
                texto = "activado";
            }
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "El usuario se ha " + texto + " con éxito.",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "El usuario no ha podido ser " +
                        texto +
                        ". Inténtenlo nuevamente después de un momento.",
                    result: result,
                });
            }
        })
        .catch((err) => {
            console.log(err);
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
};

exports.updateUsuarioPassword = async (req, res) => {
    Usuario.findOne({
        where: { id: req.params.userId },
        attributes: ["password"],
    })
        .then((usuario) => {
            if (
                usuario &&
                bcrypt.compareSync(req.body.password1, usuario.password)
            ) {
                const prepass = req.body.password2;
                if (
                    prepass === null ||
                    prepass.length < 8 ||
                    prepass > 24 ||
                    !prepass.match(
                        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
                    )
                ) {
                    res.status(400).json({
                        status: "error",
                        message: "La nueva contraseña no es válida",
                    });
                } else {
                    const newPassword = bcrypt.hashSync(prepass, 10);
                    Usuario.update(
                        {
                            password: newPassword,
                        },
                        {
                            where: { id: req.params.userId },
                        }
                    )
                        .then((result) => {
                            if (result == 1) {
                                res.status(200).json({
                                    status: "success",
                                    message:
                                        "La contraseña se ha actualizado con éxito.",
                                    result: result,
                                });
                            } else {
                                res.status(403).json({
                                    status: "error",
                                    message:
                                        "La contraseña no se ha podido actualizar. Inténtenlo nuevamente después de un momento.",
                                    result: result,
                                });
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
            } else {
                res.status(400).json({
                    status: "error",
                    message: "La contraseña ingresada no es correcta.",
                });
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

exports.updateUsuarioFotoPerfil = async (req, res) => {
    uploadImage.single("foto_perfil")(req, res, (err) => {
        const file = req.file;
        if (err) {
            res.status(400).json({
                status: "error",
                message:
                    "El archivo no ha podido ser cargado. Es posible que sea muy pesado.",
                error: err,
            });
        } else if (file === null) {
            res.status(415).json({
                status: "error",
                message: "El archivo no es de un formato soportado.",
            });
        } else {
            const ruta = "/profile/" + req.file.filename;
            Usuario.update(
                {
                    foto_perfil: ruta,
                },
                {
                    where: { id: req.params.userId },
                }
            )
                .then((result) => {
                    if (result == 1) {
                        res.status(200).json({
                            status: "success",
                            message:
                                "La foto de perfil se ha actualizado con éxito.",
                            result: result,
                        });
                    } else {
                        res.status(403).json({
                            status: "error",
                            message:
                                "La foto de perfil no se ha podido actualizar. Inténtenlo nuevamente después de un momento.",
                            result: result,
                        });
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
};

exports.updateUsuarioFotoPortada = async (req, res) => {
    uploadImage.single("foto_portada")(req, res, (err) => {
        const file = req.file;
        if (err) {
            res.status(400).json({
                status: "error",
                message:
                    "El archivo no ha podido ser cargado. Es posible que sea muy pesado.",
                error: err,
            });
        } else if (file === null) {
            res.status(415).json({
                status: "error",
                message: "El archivo no es de un formato soportado.",
            });
        } else {
            const ruta = "/banner/" + req.file.filename;
            Usuario.update(
                {
                    foto_portada: ruta,
                },
                {
                    where: { id: req.params.userId },
                }
            )
                .then((result) => {
                    if (result == 1) {
                        res.status(200).json({
                            status: "success",
                            message:
                                "La foto de portada se ha actualizado con éxito.",
                            result: result,
                        });
                    } else {
                        res.status(403).json({
                            status: "error",
                            message:
                                "La foto de portada no se ha podido actualizar. Inténtenlo nuevamente después de un momento.",
                            result: result,
                        });
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
};

exports.updateUsuario = async (req, res) => {
    Usuario.update(
        {
            email: req.body.email,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fecha_nacimiento: req.body.fecha_nacimiento,
            negocio: req.body.negocio,
            bio: req.body.bio,
            celular: req.body.celular
                ? "593" + req.body.celular.substring(1)
                : null,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
            tiktok: req.body.tiktok,
            linkedin: req.body.linkedin,
            fecha_inicio: req.body.fecha_inicio,
        },
        {
            where: { id: req.params.userId },
            returning: [
                "id",
                "email",
                "nombre",
                "apellido",
                "fecha_nacimiento",
                "negocio",
                "foto_perfil",
                "foto_portada",
                "bio",
                "celular",
                "facebook",
                "instagram",
                "twitter",
                "tiktok",
                "linkedin",
                "fecha_inicio",
                "puntuacion",
                "activo",
                "creado",
                "modificado",
                "verificado",
            ],
        }
    )
        .then((result) => {
            if (result[0] == 1) {
                res.status(200).json({
                    status: "success",
                    message:
                        "Los datos del usuario han sido actualizados con éxito.",
                    result: result[0],
                    data: result[1][0],
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "Los datos del usuario no se han podido actualizar. Inténtenlo nuevamente después de un momento.",
                    result: result,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(403).json({
                    status: "error",
                    message:
                        "El " +
                        err.errors[0].path +
                        " ingresado ya ha sido registrado. ",
                    error: err,
                });
            } else if (err.name === "SequelizeValidationError") {
                res.status(400).json({
                    status: "error",
                    message:
                        "El valor ingresado en el campo " +
                        err.errors[0].path +
                        " no es válido. Ingrese un valor válido e inténtelo nuevamente.",
                    error: err,
                });
            } else if (err.name === "SequelizeDatabaseError") {
                res.status(400).json({
                    status: "error",
                    message:
                        "Uno de los valores ingresados no es válido. Revise los valores ingresados e intentelo nuevamente.",
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
};

exports.deleteUsuarioFotoPerfil = async (req, res) => {
    const oldRuta = "./media/profile/profile-" + req.params.userId + ".png";
    const newRuta = "/default/profile-default.png";
    Usuario.update(
        {
            foto_perfil: newRuta,
        },
        {
            where: { id: req.params.userId },
        }
    )
        .then((result) => {
            if (result == 1) {
                fs.unlink(oldRuta, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(403).json({
                            status: "error",
                            message: "Este usuario no tiene foto de perfil.",
                            result: result,
                        });
                    } else {
                        res.status(200).json({
                            status: "success",
                            message:
                                "La foto de perfil se ha eliminado con éxito.",
                            result: result,
                        });
                    }
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "La foto de perfil no se ha podido eliminar. Inténtelo nuevamente.",
                    result: result,
                });
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

exports.deleteUsuarioFotoPortada = async (req, res) => {
    const oldRuta = "./media/banner/banner-" + req.params.userId + ".png";
    const newRuta = "/default/banner-default.png";
    Usuario.update(
        {
            foto_portada: newRuta,
        },
        {
            where: { id: req.params.userId },
        }
    )
        .then((result) => {
            if (result == 1) {
                fs.unlink(oldRuta, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(403).json({
                            status: "error",
                            message: "Este usuario no tiene foto de portada.",
                            result: result,
                        });
                    } else {
                        res.status(200).json({
                            status: "success",
                            message:
                                "La foto de portada se ha eliminado con éxito.",
                            result: result,
                        });
                    }
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "La foto de portada no se ha podido eliminar. Intentelo nuevamente.",
                    result: result,
                });
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

exports.deleteUsuario = async (req, res) => {
    const rutaPerfil = "./media/profile/profile-" + req.params.userId + ".png";
    const rutaPortada = "./media/banner/banner-" + req.params.userId + ".png";
    const rutaProductos = "./media/product/" + req.params.userId;

    Usuario.destroy({
        where: { id: req.params.userId },
    })
        .then((result) => {
            if (result == 1) {
                fs.unlink(rutaPerfil, (err) => {});
                fs.unlink(rutaPortada, (err) => {});
                fs.rmSync(rutaProductos, { recursive: true, force: true });
                res.status(200).json({
                    status: "success",
                    message: "El usuario se ha eliminado con éxito.",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "El usuario no se ha podido eliminar. Inténtenlo nuevamente después de un momento.",
                    result: result,
                });
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
