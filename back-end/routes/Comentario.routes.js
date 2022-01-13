const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Comentario.controller");
const auth = require("../middlwares/auth")
const admin = require("../middlwares/admin")
const emprend = require("../middlwares/emprend");
const owned = require("../middlwares/owned")

router.post('/', controller.createComentario);

router.get("/user/all/:userId", auth, admin, controller.getAllComentariosByUsuario);
router.get("/user/own/:userId", auth, emprend, owned, controller.getAllComentariosByUsuario);
//router.get("/user/:userId", controller.getComentariosByUsuario);
router.get("/publ/own/:userId/null", auth, emprend, owned, controller.getOwnComentariosByNullPublicacion);
router.get("/publ/own/:userId/:publId", auth, emprend, owned, controller.getOwnComentariosByPublicacion);
router.get("/publ/:userId/:publId", controller.getComentariosByPublicacion);

router.patch("/oculto/:userId/:comentId", auth, emprend, owned, controller.updateComentarioOculto);

router.delete("/:comentId", auth, admin, controller.deleteComentario);

module.exports = router;
