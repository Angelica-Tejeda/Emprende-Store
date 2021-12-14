const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Usuario.controller");
const auth = require("../middlwares/auth")
const owned = require("../middlwares/owned")
const admin = require("../middlwares/admin")

router.get("/all", auth, admin, controller.getAllUsuarios);
router.get("/admin", auth, admin, controller.getUsuariosAdmin);
router.get("/own/:userId", auth, owned, controller.getOwnUsuarioById);
router.get("/:userId", controller.getUsuarioById);
router.get("/", controller.getUsuarios);

router.patch("/activo/:userId", auth, admin, controller.updateUsuarioActivo);
router.patch("/password/:userId", auth, owned, controller.updateUsuarioPassword);
router.patch("/fotoPerfil/:userId", auth, owned, controller.updateUsuarioFotoPerfil);
router.patch("/fotoPortada/:userId", auth, owned, controller.updateUsuarioFotoPortada);
router.patch("/:userId", auth, owned, controller.updateUsuario);

router.delete("/fotoPerfil/:userId", auth, owned, controller.deleteUsuarioFotoPerfil);
router.delete("/fotoPortada/:userId", auth, owned, controller.deleteUsuarioFotoPortada);
router.delete("/:userId", auth, owned, controller.deleteUsuario);

module.exports = router;
