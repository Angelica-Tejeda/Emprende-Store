const express = require("express");
const { Router } = require("express");
const router = Router();
const controller = require("../controllers/auth.controller");

router.post("/signup", controller.registrarUsuario);
router.post("/login", controller.iniciarSesion);
router.post("/loginAdmin", controller.iniciarSesionAdmin);

module.exports = router;
