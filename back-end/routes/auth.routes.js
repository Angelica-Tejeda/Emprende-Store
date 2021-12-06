const express = require("express");
const { Router } = require("express");
const router = Router();
const controller = require("../controllers/auth.controller");
const auth = require("../middlwares/auth")
const admin = require("../middlwares/admin")

router.post("/signup", auth, admin, controller.registrarUsuario);
router.post("/login", controller.iniciarSesion);
router.post("/loginAdmin", controller.iniciarSesionAdmin);

module.exports = router;
