const Usuario = require("../database/models/Usuario");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./media/" + req.params.type + "/");
    },
    filename: (req, file, cb) => {
        cb(null, req.params.type + "-" + req.params.userId + ".png");
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
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
    Usuario.findAll({
        attributes: { exclude: ["password", "balance"] },
    })
        .then((usuarios) => {
            const nUsers = usuarios.length;
            if (nUsers > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Usuarios obtenidos con éxito.",
                    quantity: nUsers,
                    result: usuarios,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Usuarios no encontrados.",
                    quantity: nUsers,
                    result: usuarios,
                });
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

exports.getUsuarioById = async (req, res) => {
    Usuario.findByPk(req.params.userId, {
        attributes: { exclude: ["password", "balance"] },
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
                message: "Ha ocurrido un error inesperado.",
                error: err,
            });
        });
};

exports.getFullUsuarioById = async (req, res) => {
    Usuario.findByPk(req.params.userId, {
        attributes: { exclude: ["password"] },
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
                message: "Ha ocurrido un error inesperado.",
                error: err,
            });
        });
};

/*exports.getUsuarioByEmail = async (req, res) => {
    Usuario.findOne({
        where: { email: req.params.email },
        attributes: { exclude: ["password", "balance"] },
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
                message: "Ha ocurrido un error inesperado.",
                error: err,
            });
        });
};*/

exports.getUsuariosEmpr = async (req, res) => {
    Usuario.findAll({
        where: { rol: false },
        attributes: { exclude: ["password", "balance"] },
    })
        .then((usuarios) => {
            const nUsers = usuarios.length;
            if (nUsers > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Usuarios obtenidos con éxito.",
                    quantity: nUsers,
                    result: usuarios,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Usuarios no encontrados.",
                    quantity: nUsers,
                    result: usuarios,
                });
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

exports.updateUsuario = async (req, res) => {
    Usuario.update(
        {
            email: req.body.email,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fecha_nacimiento: req.body.fecha_nacimiento,
            negocio: req.body.negocio,
            //foto_perfil: req.body.foto_perfil,
            //foto_portada: req.body.foto_portada,
            bio: req.body.bio,
            celular: req.body.celular,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
            tiktok: req.body.tiktok,
            linkedin: req.body.linkedin,
        },
        {
            where: { id: req.params.userId },
        }
    )
        .then((result) => {
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "El usuario se ha actualizado con éxito.",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "El usuario no se ha podido actualizar o no existe.",
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
                    message: "Ha ocurrido un error inesperado.",
                    error: err,
                });
            }
        });
};

exports.updateUsuarioAct = async (req, res) => {
    Usuario.update(
        {
            activo: req.body.activo,
        },
        {
            where: { id: req.params.userId },
        }
    )
        .then((result) => {
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "El usuario se ha actualizado con éxito.",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "El usuario no se ha podido actualizar o no existe.",
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
                    message: "Ha ocurrido un error inesperado.",
                    error: err,
                });
            }
        });
};

exports.updatePassword = async (req, res) => {
    const prepass = req.body.password;
    if (prepass == null || prepass.length < 8) {
        res.status(400).json({
            status: "error",
            message: "El valor ingresado en el campo contraseña no es válido.",
        });
    } else {
        const password = bcrypt.hashSync(prepass, 10);
        Usuario.update(
            {
                password: password,
            },
            {
                where: { id: req.params.userId },
            }
        )
            .then((result) => {
                if (result == 1) {
                    res.status(200).json({
                        status: "success",
                        message: "La contraseña se ha actualizado con éxito.",
                        result: result,
                    });
                } else {
                    res.status(403).json({
                        status: "error",
                        message: "La contraseña no se ha podido actualizar.",
                        result: result,
                    });
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
    }
};

exports.updateFotoPerfil = async (req, res) => {
    uploadImage.single("foto_perfil")(req, res, (err) => {
        const file = req.file;
        if (err) {
            res.status(400).json({
                status: "error",
                message: "El archivo no ha podido ser cargado.",
                error: err,
            });
        } else if (file == null) {
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
                                "La foto de perfil no se ha podido actualizar.",
                            result: result,
                        });
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
        }
    });
};

exports.deleteFotoPerfil = async (req, res) => {
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
                    message: "La foto de perfil no se ha podido eliminar.",
                    result: result,
                });
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

exports.updateFotoPortada = async (req, res) => {
    uploadImage.single("foto_portada")(req, res, (err) => {
        const file = req.file;
        if (err) {
            res.status(400).json({
                status: "error",
                message: "El archivo no ha podido ser cargado.",
                error: err,
            });
        } else if (file == null) {
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
                                "La foto de portada no se ha podido actualizar.",
                            result: result,
                        });
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
        }
    });
};

exports.deleteFotoPortada = async (req, res) => {
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
                    message: "La foto de portada no se ha podido eliminar.",
                    result: result,
                });
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

exports.deleteUsuario = async (req, res) => {
    const rutaPerfil = "./media/profile/profile-" + req.params.userId + ".png";
    const rutaPortada = "./media/banner/banner-" + req.params.userId + ".png";
    Usuario.destroy({
        where: { id: req.params.userId },
    })
        .then((result) => {
            if (result == 1) {
                fs.unlink(rutaPerfil, (err) => {});
                fs.unlink(rutaPortada, (err) => {});
                res.status(200).json({
                    status: "success",
                    message: "El usuario se ha eliminado con éxito.",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message: "El usuario no se ha podido eliminar o no existe.",
                    result: result,
                });
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
