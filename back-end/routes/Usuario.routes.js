const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Usuario.controller");

//router.post('/', controller.createUsuario);
router.get("/", controller.getAllUsuarios);
router.get("/:id", controller.getUsuarioById);
router.get("/email/:email", controller.getUsuarioByEmail);
router.get("/rol/:rol", controller.getUsuariosByRol);
router.patch("/:id", controller.updateUsuario);
router.patch("/password/:id", controller.updatePassword);
router.patch("/fotoPerfil/:id/:type", controller.updateFotoPerfil);
router.patch("/fotoPerfilDel/:id", controller.deleteFotoPerfil);
router.patch("/fotoPortada/:id/:type", controller.updateFotoPortada);
router.patch("/fotoPortadaDel/:id", controller.deleteFotoPortada);
router.delete("/:id", controller.deleteUsuario);

module.exports = router;
