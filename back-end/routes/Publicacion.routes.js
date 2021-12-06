const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Publicacion.controller");
const auth = require("../middlwares/auth")
const admin = require("../middlwares/admin")
const emprend = require("../middlwares/emprend");
const owned = require("../middlwares/owned")

router.post('/', auth, emprend, controller.createPublicacion);

router.get("/", auth, admin, controller.getAllPublicaciones);
router.get("/act", controller.getAllActivePublicaciones);
router.get("/user/:userId", auth, emprend, owned, controller.getPublicacionesByUser);
router.get("/act/user/:userId", controller.getActivePublicacionesByUser);
router.get("/:publId", controller.getActivePublicacionById);
router.get("/:userId/:publId", auth, emprend, owned, controller.getPublicacionById);

router.patch("/foto/:userId/:publId", auth, emprend, owned, controller.uploadFoto);
router.patch("/fotoDel/:userId/:publId/:filename", auth, emprend, owned, controller.deleteFoto);
router.patch("/:userId/:publId", auth, emprend, owned, controller.updatePublicacion);

router.delete("/:userId/:publId", auth, emprend, owned, controller.deletePublicacion);

module.exports = router;
