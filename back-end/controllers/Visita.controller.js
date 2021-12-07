const sequelize = require("../database/db");
const { Op } = require("sequelize");
const VisitaPerfil = require("../database/models/VisitaPerfil");
const VisitaPublicacion = require("../database/models/VisitaPublicacion");
const VisitaCompra = require("../database/models/VisitaCompra");

exports.createVisitaPerfil = async (req, res) => {
    VisitaPerfil.create({
        usuario_id: req.body.usuario,
        ip: req.body.ip,
    })
        .then((visita) => {
            res.status(200).json({
                status: "success",
                message: "La visita al perfil se ha registrado.",
                result: visita,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                status: "error",
                message: "La visita al perfil no se ha registrado.",
                error: err,
            });
        });
};

exports.createVisitaPublicacion = async (req, res) => {
    VisitaPublicacion.create({
        usuario_id: req.body.usuario,
        publicacion_id: req.body.publicacion,
        ip: req.body.ip,
    })
        .then((visita) => {
            res.status(200).json({
                status: "success",
                message: "La visita a la publicación se ha registrado.",
                result: visita,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                status: "error",
                message: "La visita a la publicación no se ha registrado.",
                error: err,
            });
        });
};

exports.createVisitaCompra = async (req, res) => {
    VisitaCompra.create({
        usuario_id: req.body.usuario,
        publicacion_id: req.body.publicacion,
        ip: req.body.ip,
    })
        .then((visita) => {
            res.status(200).json({
                status: "success",
                message: "La compra en la publicación se ha registrado.",
                result: visita,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                status: "error",
                message: "La compra en la publicación no se ha registrado.",
                error: err,
            });
        });
};

exports.getVisitaPerfilByUser = async (req, res) => {
    VisitaPerfil.count({
        where: {
            usuario_id: req.params.userId,
            fecha: {
                [Op.between]: [req.body.inicio, req.body.final],
            },
        },
    })
        .then((visitas) => {
            res.status(200).json({
                status: "success",
                message: "Visitas obtenidas con éxito.",
                result: visitas,
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

exports.getVisitaPerfilDistinctByUser = async (req, res) => {
    VisitaPerfil.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('ip')), 'ip']],
        where: {
            usuario_id: req.params.userId,
            fecha: {
                [Op.between]: [req.body.inicio, req.body.final],
            },
        },
    })
        .then((visitas) => {
            res.status(200).json({
                status: "success",
                message: "Visitas obtenidas con éxito.",
                result: visitas.length,
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

exports.getVisitaPublicacionByUser = async (req, res) => {
    VisitaPublicacion.count({
        where: {
            usuario_id: req.params.userId,
            fecha: {
                [Op.between]: [req.body.inicio, req.body.final],
            },
        },
    })
        .then((visitas) => {
            res.status(200).json({
                status: "success",
                message: "Visitas obtenidas con éxito.",
                result: visitas,
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

exports.getVisitaPublicacionDistinctByUser = async (req, res) => {
    VisitaPublicacion.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('ip')), 'ip']],
        where: {
            usuario_id: req.params.userId,
            fecha: {
                [Op.between]: [req.body.inicio, req.body.final],
            },
        },
    })
        .then((visitas) => {
            res.status(200).json({
                status: "success",
                message: "Visitas obtenidas con éxito.",
                result: visitas.length,
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

exports.getVisitaPublicacionByPubl = async (req, res) => {
    VisitaPublicacion.count({
        where: {
            publicacion_id: req.params.publId,
            fecha: {
                [Op.between]: [req.body.inicio, req.body.final],
            },
        },
    })
        .then((visitas) => {
            res.status(200).json({
                status: "success",
                message: "Visitas obtenidas con éxito.",
                result: visitas,
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

exports.getVisitaPublicacionDistinctByPubl = async (req, res) => {
    VisitaPublicacion.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('ip')), 'ip']],
        where: {
            publicacion_id: req.params.publId,
            fecha: {
                [Op.between]: [req.body.inicio, req.body.final],
            },
        },
    })
        .then((visitas) => {
            res.status(200).json({
                status: "success",
                message: "Visitas obtenidas con éxito.",
                result: visitas.length,
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

exports.getVisitaCompraByUser = async (req, res) => {
    VisitaCompra.count({
        where: {
            usuario_id: req.params.userId,
            fecha: {
                [Op.between]: [req.body.inicio, req.body.final],
            },
        },
    })
        .then((visitas) => {
            res.status(200).json({
                status: "success",
                message: "Visitas obtenidas con éxito.",
                result: visitas,
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

exports.getVisitaCompraDistinctByUser = async (req, res) => {
    VisitaCompra.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('ip')), 'ip']],
        where: {
            usuario_id: req.params.userId,
            fecha: {
                [Op.between]: [req.body.inicio, req.body.final],
            },
        },
    })
        .then((visitas) => {
            res.status(200).json({
                status: "success",
                message: "Visitas obtenidas con éxito.",
                result: visitas.length,
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

exports.getVisitaCompraByPubl = async (req, res) => {
    VisitaCompra.count({
        where: {
            publicacion_id: req.params.publId,
            fecha: {
                [Op.between]: [req.body.inicio, req.body.final],
            },
        },
    })
        .then((visitas) => {
            res.status(200).json({
                status: "success",
                message: "Visitas obtenidas con éxito.",
                result: visitas,
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

exports.getVisitaCompraDistinctByPubl = async (req, res) => {
    VisitaCompra.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('ip')), 'ip']],
        where: {
            publicacion_id: req.params.publId,
            fecha: {
                [Op.between]: [req.body.inicio, req.body.final],
            },
        },
    })
        .then((visitas) => {
            res.status(200).json({
                status: "success",
                message: "Visitas obtenidas con éxito.",
                result: visitas.length,
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