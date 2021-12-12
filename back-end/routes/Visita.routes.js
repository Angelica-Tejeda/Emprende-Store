const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Visita.controller");

router.post('/perfil', controller.createVisitaPerfil);
router.post('/publ', controller.createVisitaPublicacion);
router.post('/contacto', controller.createContactoPublicacion);

router.get("/perfil/user/:userId/", controller.getVisitaPerfilByUsuario);
router.get("/perfil/user/dist/:userId/", controller.getVisitaPerfilDistinctByUsuario);

router.get("/publ/user/:userId/", controller.getVisitaPublicacionByUsuario);
router.get("/publ/user/dist/:userId/", controller.getVisitaPublicacionDistinctByUsuario);
router.get("/publ/publ/:publId/", controller.getVisitaPublicacionByPubl);
router.get("/publ/publ/dist/:publId/", controller.getVisitaPublicacionDistinctByPubl);

router.get("/contacto/user/:userId/", controller.getContactoPublicacionByUsuario);
router.get("/contacto/user/dist/:userId/", controller.getContactoPublicacionDistinctByUsuario);
router.get("/contacto/publ/:publId/", controller.getContactoPublicacionByPubl);
router.get("/contacto/publ/dist/:publId/", controller.getContactoPublicacionDistinctByPubl);

module.exports = router;
