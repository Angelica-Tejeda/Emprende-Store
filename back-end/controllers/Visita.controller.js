const sequelize = require("../database/db");
const { Op } = require("sequelize");
const VisitaPerfil = require("../database/models/VisitaPerfil");
const VisitaPublicacion = require("../database/models/VisitaPublicacion");

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
        contacto: false,
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

exports.createContactoPublicacion = async (req, res) => {
    VisitaPublicacion.create({
        usuario_id: req.body.usuario,
        publicacion_id: req.body.publicacion,
        ip: req.body.ip,
        contacto: true,
    })
        .then((visita) => {
            res.status(200).json({
                status: "success",
                message: "El contacto con el vendedor de la publicación se ha registrado.",
                result: visita,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                status: "error",
                message: "El contacto con el vendedor de la publicación no se ha registrado.",
                error: err,
            });
        });
};

exports.getVisitaPerfilByUsuario = async (req, res) => {
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

exports.getVisitaPerfilDistinctByUsuario = async (req, res) => {
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

exports.getVisitaPublicacionByUsuario = async (req, res) => {
    VisitaPublicacion.count({
        where: {
            usuario_id: req.params.userId,
            contacto: false,
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

exports.getVisitaPublicacionDistinctByUsuario = async (req, res) => {
    VisitaPublicacion.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('ip')), 'ip']],
        where: {
            usuario_id: req.params.userId,
            contacto: false,
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
            contacto: false,
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
            contacto: false,
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

exports.getContactoPublicacionByUsuario = async (req, res) => {
    VisitaPublicacion.count({
        where: {
            usuario_id: req.params.userId,
            contacto: true,
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

exports.getContactoPublicacionDistinctByUsuario = async (req, res) => {
    VisitaPublicacion.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('ip')), 'ip']],
        where: {
            usuario_id: req.params.userId,
            contacto: true,
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

exports.getContactoPublicacionByPubl = async (req, res) => {
    VisitaPublicacion.count({
        where: {
            publicacion_id: req.params.publId,
            contacto: true,
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

exports.getContactoPublicacionDistinctByPubl = async (req, res) => {
    VisitaPublicacion.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('ip')), 'ip']],
        where: {
            publicacion_id: req.params.publId,
            contacto: true,
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