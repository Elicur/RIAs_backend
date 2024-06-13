const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenesController');
const { verifyToken, isAdmin, isUser } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Obtiene la lista de ordenes' */
  /* #swagger.tags = ['Ordenes'] */
  ordenesController.getOrdenes(req, res);
});

router.post('/', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Agrega una nueva orden' */
  /* #swagger.tags = ['Ordenes'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add new product.',
        schema: { $ref: '#/definitions/Orden' }
    } */
  ordenesController.createOrden(req, res);
});

router.put('/:id', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Actualiza una orden existente' */
  /* #swagger.tags = ['Ordenes'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID de la orden', type: 'integer', required: true } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update orden.',
        schema: { $ref: '#/definitions/Orden' }
    } */
  ordenesController.updateOrden(req, res);
});

module.exports = router;
