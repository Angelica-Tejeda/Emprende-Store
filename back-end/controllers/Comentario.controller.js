const Comentario = require("../database/models/Comentario");

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

exports.getComentariosByUsuario = async (req, res) => {
    Comentario.findAndCountAll({
        order: "creado DESC",
        where: {
            usuario_id: req.params.user_id,
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
                message: "Ha ocurrido un error inesperado.",
                error: err,
            });
        });
};

exports.getAllComentariosByUsuario = async (req, res) => {
    Comentario.findAndCountAll({
        order: "creado DESC",
        where: {
            usuario_id: req.params.user_id,
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
                message: "Ha ocurrido un error inesperado.",
                error: err,
            });
        });
};

exports.getComentariosByPublicacion = async (req, res) => {
    Comentario.findAndCountAll({
        order: "creado DESC",
        where: {
            usuario_id: req.params.user_id,
            publicacion_id: req.params.publicacion_id,
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
                message: "Ha ocurrido un error inesperado.",
                error: err,
            });
        });
};

exports.getAllComentariosByPublicacion = async (req, res) => {
    Comentario.findAndCountAll({
        order: "creado DESC",
        where: {
            usuario_id: req.params.user_id,
            publicacion_id: req.params.publicacion_id,
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
                message: "Ha ocurrido un error inesperado.",
                error: err,
            });
        });
};

exports.updateOcultarComentario = async (req, res) => {
    Comentario.update(
        {
            oculto: true,
        },
        {
            where: { id: req.params.comentId },
        }
    )
        .then((result) => {
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "El comentario ha sido ocultado",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message: "EL comentario no ha podido ser ocultado.",
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

exports.updateMostrarComentario = async (req, res) => {
    Comentario.update(
        {
            oculto: false,
        },
        {
            where: { id: req.params.comentId },
        }
    )
        .then((result) => {
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "El comentario ha sido ocultado",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message: "EL comentario no ha podido ser ocultado.",
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

exports.deleteComentario = async (req, res) => {
    Comentario.destroy({
        where: { id: req.params.comentId },
    })
        .then((result) => {
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "El comentario ha sido eliminado",
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
                message: "Ha ocurrido un error inesperado.",
                error: err,
            });
        });
};
