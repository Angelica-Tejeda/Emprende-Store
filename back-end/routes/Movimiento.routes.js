const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Movimiento.controller");
const auth = require("../middlwares/auth")
const admin = require("../middlwares/admin")
const emprend = require("../middlwares/emprend");
const owned = require("../middlwares/owned")

router.post('/', auth, emprend, controller.createMovimiento);

router.get("/:userId", auth, emprend, owned, controller.getMovimientosByUser)

router.patch("/:userId/:movimId", auth, emprend, owned, controller.updateMovimiento);

router.delete("/:userId/:movimId", auth, emprend, owned, controller.deleteMovimiento);

module.exports = router;