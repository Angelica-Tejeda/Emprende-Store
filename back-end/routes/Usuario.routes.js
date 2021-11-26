const {Router} = require('express');
const router = Router();
const controller = require('../controllers/Usuario.controller');

//router.post('/', controller.createUsuario);
router.get('/', controller.getAllUsuarios);
router.get('/:id', controller.getUsuarioById);
router.get('/email/:email', controller.getUsuarioByEmail);
router.get('/rol/:rol', controller.getUsuariosByRol);
router.patch('/:id', controller.updateUsuario);
router.patch('/password/:id', controller.updatePassword);
router.delete('/:id', controller.deleteUsuario);

module.exports = router;
