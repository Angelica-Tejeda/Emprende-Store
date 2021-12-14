const Comentario = require("../database/models/Comentario");
const Publicacion = require("../database/models/Publicacion");

exports.createComentario = async (req, res) => {
    Comentario.create({
        publicacion_id: req.body.publicacion_id,
        usuario_id: req.body.usuario_id,
        celular: req.body.celular,
        nombre: req.body.nombre,
        texto: req.body.texto,
        puntuacion: req.body.puntuacion,
    })
        .then((comentario) => {
            res.status(200).json({
                status: "success",
                message: "El comentario se ha enviado con éxico.",
                result: comentario,
            });
        })
        .catch((err) => {
            console.log("ERROR: " + err);
            if (err.name === "SequelizeValidationError") {
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

exports.getAllComentariosByUsuario = async (req, res) => {
    Comentario.findAndCountAll({
        order: [["id", "DESC"]],
        where: {
            usuario_id: req.params.userId,
        },
        include: [
            {
                model: Publicacion,
                attributes: ["id", "titulo", "fotos", "precio", "activo"],
            },
        ],
    })
        .then((comentarios) => {
            if (comentarios.count > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Comentarios obtenidos con éxito.",
                    result: comentarios,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Comentarios no encontrados.",
                    result: comentarios,
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

exports.getComentariosByUsuario = async (req, res) => {
    Comentario.findAndCountAll({
        order: [["id", "DESC"]],
        where: {
            usuario_id: req.params.userId,
            oculto: false,
        },
    })
        .then((comentarios) => {
            if (comentarios.count > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Comentarios obtenidos con éxito.",
                    result: comentarios,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Comentarios no encontrados.",
                    result: comentarios,
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

exports.getOwnComentariosByNullPublicacion = async (req, res) => {
    Comentario.findAndCountAll({
        order: [["id", "DESC"]],
        where: {
            usuario_id: req.params.userId,
            publicacion_id: null,
        },
    })
        .then((comentarios) => {
            if (comentarios.count > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Comentarios obtenidos con éxito.",
                    result: comentarios,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Comentarios no encontrados.",
                    result: comentarios,
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

exports.getOwnComentariosByPublicacion = async (req, res) => {
    Comentario.findAndCountAll({
        order: [["id", "DESC"]],
        where: {
            usuario_id: req.params.userId,
            publicacion_id: req.params.publId,
        },
    })
        .then((comentarios) => {
            if (comentarios.count > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Comentarios obtenidos con éxito.",
                    result: comentarios,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Comentarios no encontrados.",
                    result: comentarios,
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

exports.getComentariosByPublicacion = async (req, res) => {
    Comentario.findAndCountAll({
        order: [["id", "DESC"]],
        where: {
            usuario_id: req.params.userId,
            publicacion_id: req.params.publId,
            oculto: false,
        },
    })
        .then((comentarios) => {
            if (comentarios.count > 0) {
                res.status(200).json({
                    status: "success",
                    message: "Comentarios obtenidos con éxito.",
                    result: comentarios,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Comentarios no encontrados.",
                    result: comentarios,
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

exports.updateComentarioOculto = async (req, res) => {
    Comentario.update(
        {
            oculto: req.body.oculto,
        },
        {
            where: { id: req.params.comentId },
        }
    )
        .then((result) => {
            let texto = "desocutado";
            if (req.body.oculto) {
                texto = "ocultado";
            }
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "El comentario ha sido " + texto + " con éxito.",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "El comentario no ha podido ser " +
                        texto +
                        " o no existe.",
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

exports.deleteComentario = async (req, res) => {
    Comentario.destroy({
        where: { id: req.params.comentId },
    })
        .then((result) => {
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "El comentario ha sido eliminado con éxito.",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message: "EL comentario no ha podido ser eliminado.",
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
