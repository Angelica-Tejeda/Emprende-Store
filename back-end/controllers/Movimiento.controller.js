const Movimiento = require("../database/models/Movimiento");
const { Op } = require("sequelize");

exports.createMovimiento = async (req, res) => {
    Movimiento.create({
        usuario_id: req.user.id,
        fecha: req.body.fecha,
        detalle: req.body.detalle,
        valor: req.body.valor,
        ingreso: req.body.ingreso,
    })
        .then((movimiento) => {
            res.status(200).json({
                status: "success",
                message: "Movimiento registrado con éxito.",
                result: movimiento,
            });
        })
        .catch((err) => {
            console.log(err);
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
                    message:
                        "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                    error: err,
                });
            }
        });
};

exports.getMovimientosByUser = async (req, res) => {
    Movimiento.findAndCountAll({
        attributes: { exclude: ["usuario_id", "creado", "modificado"] },
        where: {
            usuario_id: req.user.id,
        },
    })
        .then((movimientos) => {
            if (movimientos.count > 0) {
                let total = 0;
                let totalIngresos = 0;
                let totalEgresos = 0;
                for (mov of movimientos.rows) {
                    total += parseFloat(mov.valor);
                    if (mov.valor > 0) {
                        totalIngresos += parseFloat(mov.valor);
                    } else {
                        totalEgresos += parseFloat(mov.valor);
                    }
                }
                Object.assign(movimientos, {
                    total: total.toFixed(2),
                    ingresos: totalIngresos.toFixed(2),
                    egresos: totalEgresos.toFixed(2),
                });
                res.status(200).json({
                    status: "success",
                    message: "Movimientos obtenidos con éxito.",
                    result: movimientos,
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Movimientos no encontrados.",
                    result: movimientos,
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
    //TODO: hacer los endpoints para obtener los datos
};

exports.updateMovimiento = async (req, res) => {
    Movimiento.update(
        {
            fecha: req.body.fecha,
            detalle: req.body.detalle,
            valor: req.body.valor,
            ingreso: req.body.ingreso,
        },
        {
            where: { id: req.params.movimId, usuario_id: req.user.id },
        }
    )
        .then((result) => {
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "El movimiento se ha actualizado.",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "El movimiento no se ha podido actualizar o no existe.",
                    result: result,
                });
            }
        })
        .catch((err) => {
            console.log(err);
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
                    message:
                        "Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.",
                    error: err,
                });
            }
        });
};

exports.deleteMovimiento = async (req, res) => {
    Movimiento.destroy({
        where: { id: req.params.movimId },
    })
        .then((result) => {
            if (result == 1) {
                res.status(200).json({
                    status: "success",
                    message: "El movimiento se ha eliminado",
                    result: result,
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message:
                        "EL movimiento no se ha podido eliminar o ya no existe.",
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
