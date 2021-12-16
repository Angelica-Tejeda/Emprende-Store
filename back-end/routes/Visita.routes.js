const { Router } = require("express");
const router = Router();
const controller = require("../controllers/Visita.controller");

router.post('/perfil', controller.createVisitaPerfil);
router.post('/publ', controller.createVisitaPublicacion);
router.post('/contacto', controller.createContactoPublicacion);

router.get("/perfil/user/:userId/:inicio/:final", controller.getVisitaPerfilByUsuario);
router.get("/perfil/user/dist/:userId/:inicio/:final", controller.getVisitaPerfilDistinctByUsuario);

router.get("/publ/user/:userId/:inicio/:final", controller.getVisitaPublicacionByUsuario);
router.get("/publ/user/dist/:userId/:inicio/:final", controller.getVisitaPublicacionDistinctByUsuario);
router.get("/publ/publ/:publId/:inicio/:final", controller.getVisitaPublicacionByPubl);
router.get("/publ/publ/dist/:publId/:inicio/:final", controller.getVisitaPublicacionDistinctByPubl);

router.get("/contacto/user/:userId/:inicio/:final", controller.getContactoPublicacionByUsuario);
router.get("/contacto/user/dist/:userId/:inicio/:final", controller.getContactoPublicacionDistinctByUsuario);
router.get("/contacto/publ/:publId/:inicio/:final", controller.getContactoPublicacionByPubl);
router.get("/contacto/publ/dist/:publId/:inicio/:final", controller.getContactoPublicacionDistinctByPubl);

module.exports = router;
