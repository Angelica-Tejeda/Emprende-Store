const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Comentario.controller");
const auth = require("../middlwares/auth")
const admin = require("../middlwares/admin")
const emprend = require("../middlwares/emprend");
const owned = require("../middlwares/owned")

router.post('/', controller.createComentario);

router.get("/user/:userId", controller.getComentariosByUsuario);
router.get("/user/:userId", auth, emprend, owned, controller.getAllComentariosByUsuario);
router.get("/publ/:userId/:publId", controller.getComentariosByPublicacion);
router.get("/publ/:userId/:publId", auth, emprend, owned, controller.getAllComentariosByPublicacion);

router.patch("/:comentId", auth, emprend, owned, controller.updateOcultarComentario);
router.patch("/:comentId", auth, emprend, owned, controller.updateMostrarComentario);

router.delete("/:comentId", auth, admin, controller.deleteComentario);

module.exports = router;
