const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Visita.controller");

router.post('/perfil', controller.createVisitaPerfil);
router.post('/publ', controller.createVisitaPublicacion);
router.post('/contacto', controller.createContactoPublicacion);

router.get("/perfil/user/:userId/", controller.getVisitaPerfilByUser);
router.get("/perfil/user/dist/:userId/", controller.getVisitaPerfilDistinctByUser);

router.get("/publ/user/:userId/", controller.getVisitaPublicacionByUser);
router.get("/publ/user/dist/:userId/", controller.getVisitaPublicacionDistinctByUser);
router.get("/publ/publ/:publId/", controller.getVisitaPublicacionByPubl);
router.get("/publ/publ/dist/:publId/", controller.getVisitaPublicacionByPubl);

router.get("/contacto/user/:userId/", controller.getContactoPublicacionByUser);
router.get("/contacto/user/dist/:userId/", controller.getContactoPublicacionDistinctByUser);
router.get("/contacto/publ/:publId/", controller.getContactoPublicacionByPubl);
router.get("/contacto/publ/dist/:publId/", controller.getContactoPublicacionByPubl);

module.exports = router;
