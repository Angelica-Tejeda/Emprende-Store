const Publicacion = require("../database/models/Publicacion");
const Usuario = require("../database/models/Usuario");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./media/product/");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            "product" +
                "-" +
                req.user.id +
                "-" +
                req.params.publId +
                "-" +
                Date.now() +
                ".png"
        );
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

exports.createPublicacion = async (req, res) => {
    Publicacion.create({
        emprendedor: req.user.id,
    })
        .then((publicacion) => {
            res.status(200).json({
                status: "success",
                message: "Publicación creada con éxito.",
                result: publicacion,
            });
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

exports.getAllPublicaciones = async (req, res) => {
    Publicacion.findAll({
        attributes: { exclude: ["emprendedor"] },
        include: [
            {
                model: Usuario,
                attributes: [
                    "id",
                    "nombre",
                    "apellido",
                    "negocio",
                    "foto_perfil",
                    "celular",
                    "facebook",
                    "instagram",
                    "twitter",
                    "tiktok",
                    "linkedin",
                    "activo",
                ],
            },
        ],
    })
        .then((publicaciones) => {
            const nPubs = publicaciones.length;
            if (nPubs > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Publicaciones obtenidas con éxito.",
                    quantity: nPubs,
                    result: publicaciones,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicaciones no encontradas.",
                    quantity: nPubs,
                    result: publicaciones,
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

exports.getAllActivePublicaciones = async (req, res) => {
    Publicacion.findAll({
        where: { activo: true },
        attributes: { exclude: ["emprendedor"] },
        include: [
            {
                model: Usuario,
                attributes: [
                    "id",
                    "nombre",
                    "apellido",
                    "negocio",
                    "foto_perfil",
                    "celular",
                    "facebook",
                    "instagram",
                    "twitter",
                    "tiktok",
                    "linkedin",
                    "activo",
                ],
            },
        ],
    })
        .then((publicaciones) => {
            let pubsFinal = [];
            publicaciones.forEach((e) => {
                if (e.getDataValue("usuario").getDataValue("activo")) {
                    pubsFinal.push(e);
                }
            });
            const nPubs = pubsFinal.length;
            if (nPubs > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Publicaciones obtenidas con éxito.",
                    quantity: nPubs,
                    result: pubsFinal,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicaciones no encontradas.",
                    quantity: nPubs,
                    result: pubsFinal,
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

exports.getPublicacionesByUser = async (req, res) => {
    Publicacion.findAll({
        where: { emprendedor: req.params.userId },
        attributes: { exclude: ["emprendedor"] },
        include: [
            {
                model: Usuario,
                attributes: [
                    "id",
                    "nombre",
                    "apellido",
                    "negocio",
                    "foto_perfil",
                    "celular",
                    "facebook",
                    "instagram",
                    "twitter",
                    "tiktok",
                    "linkedin",
                    "activo",
                ],
            },
        ],
    })
        .then((publicaciones) => {
            const nPubs = publicaciones.length;
            if (nPubs > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Publicaciones obtenidas con éxito.",
                    quantity: nPubs,
                    result: publicaciones,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicaciones no encontradas.",
                    quantity: nPubs,
                    result: publicaciones,
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

exports.getActivePublicacionesByUser = async (req, res) => {
    Publicacion.findAll({
        where: { emprendedor: req.params.userId, activo: true },
        attributes: { exclude: ["emprendedor"] },
        include: [
            {
                model: Usuario,
                attributes: [
                    "id",
                    "nombre",
                    "apellido",
                    "negocio",
                    "foto_perfil",
                    "celular",
                    "facebook",
                    "instagram",
                    "twitter",
                    "tiktok",
                    "linkedin",
                    "activo",
                ],
            },
        ],
    })
        .then((publicaciones) => {
            const nPubs = publicaciones.length;
            if (nPubs > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Publicaciones obtenidas con éxito.",
                    quantity: nPubs,
                    result: publicaciones,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicaciones no encontradas.",
                    quantity: nPubs,
                    result: publicaciones,
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

exports.getActivePublicacionById = async (req, res) => {
    Publicacion.findByPk(req.params.publId, {
        attributes: { exclude: ["emprendedor"] },
        include: [
            {
                model: Usuario,
                attributes: [
                    "id",
                    "nombre",
                    "apellido",
                    "negocio",
                    "foto_perfil",
                    "celular",
                    "facebook",
                    "instagram",
                    "twitter",
                    "tiktok",
                    "linkedin",
                    "activo",
                ],
            },
        ],
    })
        .then((publicacion) => {
            if (
                publicacion &&
                publicacion.getDataValue("activo") &&
                publicacion.getDataValue("usuario").getDataValue("activo")
            ) {
                res.status(200).json({
                    status: "success",
                    message: "Publicación obtenida con éxito.",
                    result: publicacion,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicación no encontrada.",
                    result: null,
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

exports.getPublicacionById = async (req, res) => {
    Publicacion.findByPk(req.params.publId, {
        attributes: { exclude: ["emprendedor"] },
        include: [
            {
                model: Usuario,
                attributes: [
                    "id",
                    "nombre",
                    "apellido",
                    "negocio",
                    "foto_perfil",
                    "celular",
                    "facebook",
                    "instagram",
                    "twitter",
                    "tiktok",
                    "linkedin",
                    "activo",
                ],
            },
        ],
    })
        .then((publicacion) => {
            if (publicacion) {
                res.status(200).json({
                    status: "success",
                    message: "Publicación obtenida con éxito.",
                    result: publicacion,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicación no encontrada.",
                    result: null,
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

exports.uploadFoto = async (req, res) => {
    let rutas = [];
    Publicacion.findByPk(req.params.publId, {
        attributes: ["fotos"],
    })
        .then((publicacion) => {
            publicacion.getDataValue("fotos").forEach((e) => {
                if (e != "/default/product-default.png") {
                    rutas.push(e);
                }
            });
            uploadImage.single("fotos")(req, res, (err) => {
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
                    const ruta = "/product/" + req.file.filename;
                    rutas.push(ruta);
                    Publicacion.update(
                        {
                            fotos: rutas,
                        },
                        {
                            where: { id: req.params.publId },
                        }
                    )
                        .then((result) => {
                            if (result == 1) {
                                res.status(200).json({
                                    status: "success",
                                    message:
                                        "La foto del producto se ha subido con éxito.",
                                    result: result,
                                });
                            } else {
                                res.status(403).json({
                                    status: "error",
                                    message:
                                        "La foto del producto no ha podido ser subida.",
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

exports.deleteFoto = async (req, res) => {
    let rutas = [];
    const oldFoto = "/product/" + req.params.filename;
    const newFoto = ["/default/product-default.png"];
    Publicacion.findByPk(req.params.publId, {
        attributes: ["fotos"],
    })
        .then((publicacion) => {
            if (publicacion.getDataValue("fotos").length <= 1) {
                Publicacion.update(
                    {
                        fotos: newFoto,
                    },
                    {
                        where: { id: req.params.publId },
                    }
                )
                    .then((result) => {
                        if (result == 1) {
                            fs.unlink("./media" + oldFoto, (err) => {
                                if (err) {
                                    console.error(err);
                                    res.status(403).json({
                                        status: "error",
                                        message: "Esta foto no existe.",
                                        result: result,
                                    });
                                } else {
                                    res.status(200).json({
                                        status: "success",
                                        message:
                                            "La foto del producto se ha eliminado con éxito.",
                                        result: result,
                                    });
                                }
                            });
                        } else {
                            res.status(403).json({
                                status: "error",
                                message:
                                    "La foto del producto no se ha podido eliminar.",
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
            } else {
                publicacion.getDataValue("fotos").forEach((e) => {
                    if (e != oldFoto) {
                        rutas.push(e);
                    }
                });
                Publicacion.update(
                    {
                        fotos: rutas,
                    },
                    {
                        where: { id: req.params.publId },
                    }
                )
                    .then((result) => {
                        if (result == 1) {
                            fs.unlink("./media" + oldFoto, (err) => {
                                if (err) {
                                    console.error(err);
                                    res.status(403).json({
                                        status: "error",
                                        message: "Esta foto no existe.",
                                        result: result,
                                    });
                                } else {
                                    res.status(200).json({
                                        status: "success",
                                        message:
                                            "La foto del producto se ha eliminado con éxito.",
                                        result: result,
                                    });
                                }
                            });
                        } else {
                            res.status(403).json({
                                status: "error",
                                message:
                                    "La foto del producto no se ha podido eliminar.",
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

exports.updatePublicacion = async (req, res) => {
    Publicacion.update(
        {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            servicio: req.body.servicio,
            categoria: req.body.categoria,
            precio: req.body.precio,
        },
        {
            where: { id: req.params.publId },
        }
    )
        .then((result) => {
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "La publicación se ha actualizado con éxito.",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "La publicación no se ha podido actualizar o no existe.",
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
                        "El usuario ya tiene una publicación con éste título.",
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

exports.deletePublicacion = async (req, res) => {
    let rutas = [];
    Publicacion.findByPk(req.params.publId, {
        attributes: ["fotos"],
    })
        .then((publicacion) => {
            if (publicacion) {
                publicacion.getDataValue("fotos").forEach((e) => {
                    if (e != "/default/product-default.png") {
                        rutas.push(e);
                    }
                });
                Publicacion.destroy({
                    where: { id: req.params.publId },
                })
                    .then((result) => {
                        if (result == 1) {
                            rutas.forEach((e) => {
                                fs.unlink("./media" + e, (err) => {});
                            });
                            res.status(200).json({
                                status: "success",
                                message:
                                    "La publicación se ha eliminado con éxito.",
                                result: result,
                            });
                        } else {
                            res.status(403).json({
                                status: "error",
                                message:
                                    "La publicación no se ha podido eliminar.",
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
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "La publicación no existe."
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
