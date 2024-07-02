const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenesController');
const { verifyToken, isAdmin, isUser, isPanadero, isOnlyUser } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', verifyToken, isPanadero, (req, res) => {
  /* #swagger.summary = 'Obtiene la lista de ordenes' */
  /* #swagger.tags = ['Ordenes'] */
  ordenesController.getOrdenes(req, res);
});

router.get('/:id', verifyToken, isPanadero, (req, res) => {
  /* #swagger.summary = 'Obtiene una orden por ID' */
  /* #swagger.tags = ['Ordenes'] */
  /* #swagger.parameters['id'] = { description: 'ID de la orden', type: 'integer', required: true } */
  ordenesController.getOrdenById(req, res);
});

// obtener ordenes por cliente
router.get('/cliente/:cliente', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Obtiene las ordenes de un cliente' */
  /* #swagger.tags = ['Ordenes'] */
  /* #swagger.parameters['cliente'] = { description: 'Correo del cliente', type: 'string', required: true } */
  ordenesController.getOrdenesByCliente(req, res);
});

router.post('/', verifyToken, isOnlyUser, (req, res) => {
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

router.put('/:id', verifyToken, isPanadero, (req, res) => {
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

router.delete('/producto', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Actualiza una orden existente' */
  /* #swagger.tags = ['Ordenes'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID de la orden', type: 'integer', required: true } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update orden.',
        schema: { $ref: '#/definitions/Orden' }
    } */
  ordenesController.deleteProductoFromOrdenes(req, res);
});

module.exports = router;
