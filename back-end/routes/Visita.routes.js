const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Visita.controller");

router.post('/perfil', controller.createVisitaPerfil);
router.post('/publ', controller.createVisitaPublicacion);
router.post('/compra', controller.createVisitaCompra);

router.get("/perfil/user/:userId/", controller.getVisitaPerfilByUser);
router.get("/perfil/user/dist/:userId/", controller.getVisitaPerfilDistinctByUser);

router.get("/publ/user/:userId/", controller.getVisitaPublicacionByUser);
router.get("/publ/user/dist/:userId/", controller.getVisitaPublicacionDistinctByUser);
router.get("/publ/publ/:publId/", controller.getVisitaPublicacionByPubl);
router.get("/publ/publ/dist/:publId/", controller.getVisitaPublicacionByPubl);

router.get("/compra/user/:userId/", controller.getVisitaPublicacionByUser);
router.get("/compra/user/dist/:userId/", controller.getVisitaPublicacionDistinctByUser);
router.get("/compra/publ/:publId/", controller.getVisitaPublicacionByPubl);
router.get("/compra/publ/dist/:publId/", controller.getVisitaPublicacionByPubl);

module.exports = router;
