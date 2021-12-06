const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Usuario.controller");
const auth = require("../middlwares/auth")
const owned = require("../middlwares/owned")
const admin = require("../middlwares/admin")

router.get("/", auth, admin, controller.getAllUsuarios);
router.get("/empr", controller.getUsuariosEmpr);
router.get("/full/:userId", auth, owned, controller.getFullUsuarioById);
router.get("/:userId", controller.getUsuarioById);
//router.get("/email/:email", auth, controller.getUsuarioByEmail);

router.patch("/password/:userId", auth, owned, controller.updatePassword);
router.patch("/fotoPerfil/:type/:userId", auth, owned, controller.updateFotoPerfil);
router.patch("/fotoPerfilDel/:userId", auth, owned, controller.deleteFotoPerfil);
router.patch("/fotoPortada/:type/:userId", auth, owned, controller.updateFotoPortada);
router.patch("/fotoPortadaDel/:userId", auth, owned, controller.deleteFotoPortada);
router.patch("/act/:userId", auth, admin, controller.updateUsuarioAct);
router.patch("/:userId", auth, owned, controller.updateUsuario);

router.delete("/:userId", auth, owned, controller.deleteUsuario);

module.exports = router;
