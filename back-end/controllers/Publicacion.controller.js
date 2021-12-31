const Publicacion = require("../database/models/Publicacion");
const Usuario = require("../database/models/Usuario");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./media/product/" + req.user.id + "/");
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

exports.createPublicacion = async (req, res) => {
    Publicacion.create({
        usuario_id: req.user.id,
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
                message:
                    "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                error: err,
            });
        });
};

exports.getCategorias = async (req, res) => {
    const preResultado = Publicacion.rawAttributes.categoria.type.type.values;
    let categoriasProductos = [];
    let categoriasServicios = [];
    for (cat of preResultado) {
        if (cat.split(".")[0] == "p") {
            categoriasProductos.push(cat.split(".")[1]);
        } else {
            categoriasServicios.push(cat.split(".")[1]);
        }
    }
    if (
        categoriasProductos === null ||
        categoriasServicios === null ||
        categoriasProductos === undefined ||
        categoriasServicios === undefined ||
        categoriasProductos.length === 0 ||
        categoriasServicios.length === 0
    ) {
        res.status(404).json({
            status: "error",
            message: "Categorias no encontradas.",
            result: [],
        });
    } else {
        res.status(200).json({
            status: "success",
            message: "Categorias obtenidas exitosametne.",
            result: {
                categoriasProductos: categoriasProductos,
                categoriasServicios: categoriasServicios,
            },
        });
    }
};

exports.getAllPublicaciones = async (req, res) => {
    Publicacion.findAndCountAll({
        attributes: { exclude: ["usuario_id"] },
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
            if (publicaciones.count > 0) {
                for (publicacion of publicaciones.rows) {
                    let categ = [];
                    for (cat of publicacion.categoria) {
                        categ.push(cat.split("-")[1]);
                    }
                    pub.categoria = categ;
                }
                res.status(200).json({
                    status: "success",
                    message: "Publicaciones obtenidas con éxito.",
                    result: publicaciones,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicaciones no encontradas.",
                    result: publicaciones,
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

exports.getOwnPublicacionesByUsuario = async (req, res) => {
    Publicacion.findAndCountAll({
        where: { usuario_id: req.params.userId },
        attributes: { exclude: ["usuario_id"] },
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
            if (publicaciones.count > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Publicaciones obtenidas con éxito.",
                    result: publicaciones,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicaciones no encontradas.",
                    result: publicaciones,
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

exports.getOwnPublicacionById = async (req, res) => {
    Publicacion.findByPk(req.params.publId, {
        attributes: { exclude: ["usuario_id"] },
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
                message:
                    "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                error: err,
            });
        });
};

exports.getDiscountPublicaciones = async (req, res) => {
    Publicacion.findAll({
        where: {
            activo: true,
            descuento: {
                [Op.gt]: 0,
            },
        },
        attributes: { exclude: ["usuario_id"] },
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
                if (e.usuario.activo) {
                    pubsFinal.push(e);
                }
            });
            const nPubs = pubsFinal.length;
            if (nPubs > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Publicaciones obtenidas con éxito.",
                    result: {
                        count: nPubs,
                        rows: pubsFinal,
                    },
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicaciones no encontradas.",
                    result: {
                        count: nPubs,
                        rows: pubsFinal,
                    },
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

exports.getPublicacionesByUsuario = async (req, res) => {
    Publicacion.findAndCountAll({
        where: { usuario_id: req.params.userId, activo: true },
        attributes: { exclude: ["usuario_id"] },
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
            if (publicaciones.count > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Publicaciones obtenidas con éxito.",
                    result: publicaciones,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicaciones no encontradas.",
                    result: publicaciones,
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

exports.getPublicacionById = async (req, res) => {
    Publicacion.findByPk(req.params.publId, {
        attributes: { exclude: ["usuario_id"] },
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
                publicacion.activo &&
                publicacion.usuario.activo
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
                message:
                    "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                error: err,
            });
        });
};

exports.getPublicaciones = async (req, res) => {
    Publicacion.findAll({
        where: { activo: true },
        attributes: { exclude: ["usuario_id"] },
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
                if (e.usuario.activo) {
                    pubsFinal.push(e);
                }
            });
            const nPubs = pubsFinal.length;
            if (nPubs > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Publicaciones obtenidas con éxito.",
                    result: {
                        count: nPubs,
                        rows: pubsFinal,
                    },
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Publicaciones no encontradas.",
                    result: {
                        count: nPubs,
                        rows: pubsFinal,
                    },
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

exports.updatePublicacionFoto = async (req, res) => {
    dir = "media/product/" + req.user.id;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    let rutas = [];
    Publicacion.findByPk(req.params.publId, {
        attributes: ["fotos"],
    })
        .then((publicacion) => {
            publicacion.fotos.forEach((e) => {
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
                } else if (file === null) {
                    res.status(415).json({
                        status: "error",
                        message: "El archivo no es de un formato soportado.",
                    });
                } else {
                    const ruta =
                        "/product/" + req.user.id + "/" + req.file.filename;
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
                                message:
                                    "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
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
                message:
                    "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                error: err,
            });
        });
};

exports.updatePublicacionActivo = async (req, res) => {
    let rutas = [];
    Publicacion.findByPk(req.params.publId, {
        attributes: [
            "titulo",
            "descripcion",
            "servicio",
            "fotos",
            "categoria",
            "precio",
            "activo",
        ],
    })
        .then((publicacion) => {
            if (publicacion) {
                if (publicacion.activo) {
                    Publicacion.update(
                        {
                            activo: false,
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
                                        "La publicación ha sido desactivada con éxito.",
                                    result: result,
                                });
                            } else {
                                res.status(403).json({
                                    status: "error",
                                    message:
                                        "La publicación no se ha podido desactivar o no existe.",
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
                } else {
                    let titulo = publicacion.titulo;
                    let descripcion = publicacion.descripcion;
                    let servicio = publicacion.servicio;
                    let fotos = publicacion.fotos;
                    let categoria = publicacion.categoria;
                    let precio = publicacion.precio;
                    if (titulo === null) {
                        res.status(403).json({
                            status: "error",
                            message:
                                "La publicación no puede ser activada debido a que el título está vacío.",
                        });
                    } else if (descripcion === null) {
                        res.status(403).json({
                            status: "error",
                            message:
                                "La publicación no puede ser activada debido a que la descripcion está vacía.",
                        });
                    } else if (servicio === null) {
                        res.status(403).json({
                            status: "error",
                            message:
                                "La publicación no puede ser activada debido a que no se ha marcado como producto o servicio.",
                        });
                    } else if (
                        fotos === [] ||
                        fotos[0] == "/default/product-default.png"
                    ) {
                        res.status(403).json({
                            status: "error",
                            message:
                                "La publicación no puede ser activada debido a que no se ha agregado al menos una foto.",
                        });
                    } else if (categoria.length < 1) {
                        res.status(403).json({
                            status: "error",
                            message:
                                "La publicación no puede ser activada debido a que no se ha seleccionado al menos una categoría.",
                        });
                    } else if (precio === null) {
                        res.status(403).json({
                            status: "error",
                            message:
                                "La publicación no puede ser activada debido a que el precio esta vacío.",
                        });
                    } else {
                        Publicacion.update(
                            {
                                activo: true,
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
                                            "La publicación ha sido activada con éxito.",
                                        result: result,
                                    });
                                } else {
                                    res.status(403).json({
                                        status: "error",
                                        message:
                                            "La publicación no se ha podido activar o no existe.",
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
                }
            } else {
                res.status(404).json({
                    status: "error",
                    message: "La publicación no ha sido encontrada.",
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

exports.updatePublicacion = async (req, res) => {
    let categ = [];
    let active = req.body.activo;
    let activeChange = false;
    let message = "La publicación se ha actualizado con éxito.";
    if (req.body.titulo === null || req.body.descripcion === null || req.body.servicio === null || req.body.categoria === null || req.body.categoria === [] || req.body.fotos === [] || req.body.precio === null) {
        if (active) {
            activeChange = true;
            message = "La publicación se ha actualizado con éxito pero ha sido marcada como desactivada debido a los cambios realizados. Para poder activarla nuevamente debe llenar los campos requeridos.";

        }
    } else if (req.body.servicio) {
        for (cat of req.body.categoria) {
            categ.push("s." + cat);
        }
    } else {
        for (cat of req.body.categoria) {
            categ.push("p." + cat);
        }
    }
    Publicacion.update(
        {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            servicio: req.body.servicio,
            categoria: categ,
            precio: req.body.precio,
            descuento: req.body.descuento,
            activo: active,
        },
        {
            where: { id: req.params.publId },
        }
    )
        .then((result) => {
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: message,
                    activeChange: activeChange,
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
                    message:
                        "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                    error: err,
                });
            }
        });
};

exports.deletePublicacionFoto = async (req, res) => {
    let rutas = [];
    const oldFoto = "/product/" + req.user.id + "/" + req.params.filename;
    const newFoto = ["/default/product-default.png"];
    Publicacion.findByPk(req.params.publId, {
        attributes: ["fotos"],
    })
        .then((publicacion) => {
            if (publicacion.fotos.length <= 1) {
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
                            message:
                                "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                            error: err,
                        });
                    });
            } else {
                publicacion.fotos.forEach((e) => {
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
                            message:
                                "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                            error: err,
                        });
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

exports.deletePublicacion = async (req, res) => {
    let rutas = [];
    Publicacion.findByPk(req.params.publId, {
        attributes: ["fotos"],
    })
        .then((publicacion) => {
            if (publicacion) {
                publicacion.fotos.forEach((e) => {
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
                            message:
                                "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                            error: err,
                        });
                    });
            } else {
                res.status(403).json({
                    status: "error",
                    message: "La publicación no existe.",
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
