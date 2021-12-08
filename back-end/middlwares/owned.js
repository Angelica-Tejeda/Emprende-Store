module.exports = (req, res, next) => {
    //console.log(req.headers);
    if (req.user.id == req.params.userId) {
        next();
    } else {
        res.status(403).json({
            status: "error",
            message: "Permisos insuficientes para realizar esta acción.",
        });
    }
};