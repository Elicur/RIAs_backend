const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/register', (req, res) => {
  // #swagger.tags = ['Usuarios']
  usuariosController.register(req, res);
});

router.post('/login', (req, res) => {
  // #swagger.tags = ['Usuarios']
  usuariosController.login(req, res);
});

router.post('/change-password', (req, res) => {
  // #swagger.tags = ['Usuarios']
  usuariosController.changePassword(req, res);
});

router.post('/forgot-password', (req, res) => {
  // #swagger.tags = ['Usuarios']
  usuariosController.forgotPassword(req, res);
});

router.post('/enable-user', (req, res) => {
  // #swagger.tags = ['Usuarios']
  usuariosController.enableUser(req, res);
});

router.post('/disable-user', (req, res) => {
  // #swagger.tags = ['Usuarios']
  usuariosController.disableUser(req, res);
});

module.exports = router;
