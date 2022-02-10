module.exports = (req, res, next) => {
    if (req.user.activo && req.user.verificado) {
        next();
    } else {
        res.status(403).json({
            status: "error",
            message: "No se puede realizar esta acción debido a que su usuario se encuentra inactivo.",
        });
    }
};
