const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Publicacion.controller");
const auth = require("../middlwares/auth")
const admin = require("../middlwares/admin")
const emprend = require("../middlwares/emprend");
const owned = require("../middlwares/owned")

router.post('/', auth, emprend, controller.createPublicacion);

router.get("/categ", controller.getCategorias);

router.get("/all", auth, admin, controller.getAllPublicaciones);
router.get("/own/user/:userId", auth, emprend, owned, controller.getOwnPublicacionesByUsuario);
router.get("/own/:userId/:publId", auth, emprend, owned, controller.getOwnPublicacionById);
router.get("/descuento", controller.getDiscountPublicaciones);
router.get("/user/:userId", controller.getPublicacionesByUsuario);
router.get("/:publId", controller.getPublicacionById);
router.get("/", controller.getPublicaciones);

router.patch("/foto/:userId/:publId", auth, emprend, owned, controller.updatePublicacionFoto);
router.patch("/activo/:userId/:publId", auth, emprend, owned, controller.updatePublicacionActivo);
router.patch("/:userId/:publId", auth, emprend, owned, controller.updatePublicacion);

router.delete("/foto/:userId/:publId/:filename", auth, emprend, owned, controller.deletePublicacionFoto);
router.delete("/:userId/:publId", auth, emprend, owned, controller.deletePublicacion);

module.exports = router;
