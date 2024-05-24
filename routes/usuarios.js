const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/register', usuariosController.register);
router.post('/login', usuariosController.login);
router.post('/change-password', usuariosController.changePassword);
router.post('/forgot-password', usuariosController.forgotPassword);
router.post('/enable-user', usuariosController.enableUser);
router.post('/disable-user', usuariosController.disableUser);

module.exports = router;
