const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const { verifyToken, isUser } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/:id', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Obtiene la lista de productos' */
  /* #swagger.tags = ['Productos'] */
  carritoController.get(req, res);
});

router.post('/', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Agrega un nuevo producto' */
  /* #swagger.tags = ['Productos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add new product.',
        schema: { $ref: '#/definitions/Producto' }
    } */
  carritoController.add(req, res);
});

router.delete('/:email', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Elimina todos los productos' */
  /* #swagger.tags = ['Productos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del producto', type: 'integer', required: true } */
  carritoController.deleteAll(req, res);
});

router.delete('/:email/:id', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Elimina un producto' */
  /* #swagger.tags = ['Productos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del producto', type: 'integer', required: true } */
  carritoController.delete(req, res);
});

module.exports = router;
