const express = require('express');
const router = express.Router();
const insumosController = require('../controllers/insumosController');
const { verifyToken, isAdmin, isPanadero } = require('../middleware/auth');

router.get('/', verifyToken, isAdmin, (req, res) => {
    /* #swagger.summary = 'Obtiene la lista de insumos' */
    /* #swagger.tags = ['Insumos'] */
    insumosController.getInsumos(req, res);
});

router.get('/:id', verifyToken, isPanadero, (req, res) => {
    /* #swagger.summary = 'Obtiene un insumo por ID' */
    /* #swagger.tags = ['Insumos'] */
    insumosController.getInsumoById(req, res);
});

router.post('/', verifyToken, isAdmin, (req, res) => {
    /* #swagger.summary = 'Crea un insumo' */
    /* #swagger.tags = ['Insumos'] */
    insumosController.createInsumo(req, res);
});

router.put('/:id', verifyToken, isAdmin, (req, res) => {
    /* #swagger.summary = 'Actualiza un insumo' */
    /* #swagger.tags = ['Insumos'] */
    insumosController.updateInsumo(req, res);
});

router.delete('/:id', verifyToken, isAdmin, (req, res) => {
    /* #swagger.summary = 'Elimina un insumo' */
    /* #swagger.tags = ['Insumos'] */
    insumosController.deleteInsumo(req, res);
});

module.exports = router;