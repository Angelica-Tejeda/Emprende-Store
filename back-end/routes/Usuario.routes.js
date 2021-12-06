const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Usuario.controller");
const auth = require("../middlwares/authUser")
const self = require("../middlwares/selfUser")
const admin = require("../middlwares/authAdmin")

router.get("/", auth, admin, controller.getAllUsuarios);
router.get("/empr", controller.getUsuariosEmpr);
router.get("/full/:id", auth, self, controller.getFullUsuarioById);
router.get("/:id", controller.getUsuarioById);
//router.get("/email/:email", auth, controller.getUsuarioByEmail);
router.patch("/password/:id", auth, self, controller.updatePassword);
router.patch("/fotoPerfil/:type/:id", auth, self, controller.updateFotoPerfil);
router.patch("/fotoPerfilDel/:id", auth, self, controller.deleteFotoPerfil);
router.patch("/fotoPortada/:type/:id", auth, self, controller.updateFotoPortada);
router.patch("/fotoPortadaDel/:id", auth, self, controller.deleteFotoPortada);
router.patch("/act/:id", auth, admin, controller.updateUsuarioAct);
router.patch("/:id", auth, self, controller.updateUsuario);
router.delete("/:id", auth, self, controller.deleteUsuario);

module.exports = router;
