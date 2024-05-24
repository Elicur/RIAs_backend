const express = require('express');
const router = express.Router();
const hospitalesController = require('../controllers/hospitalesController');

router.get('/', (req, res) => {
  /* #swagger.summary = 'Obtiene la lista de hospitales' */
  /* #swagger.tags = ['Hospitales'] */
  hospitalesController.getHospitales(req, res);
});

router.get('/:id', (req, res) => {
  /* #swagger.summary = 'Obtiene un hospital por ID' */
  /* #swagger.tags = ['Hospitales'] */
  /* #swagger.parameters['id'] = { description: 'ID del hospital', type: 'integer', required: true } */
  hospitalesController.getHospitalById(req, res);
});

router.post('/', (req, res) => {
  /* #swagger.summary = 'Agrega un nuevo hospital' */
  /* #swagger.tags = ['Hospitales'] */
  /* #swagger.body = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Hospital' }
          }
        }
  } */
  hospitalesController.createHospital(req, res);
});

router.put('/:id', (req, res) => {
  /* #swagger.summary = 'Actualiza un hospital existente' */
  /* #swagger.tags = ['Hospitales'] */
  /* #swagger.parameters['id'] = { description: 'ID del hospital', type: 'integer', required: true } */
  /* #swagger.body = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Hospital' }
          }
        }
  } */
  hospitalesController.updateHospital(req, res);
});

router.delete('/:id', (req, res) => {
  /* #swagger.summary = 'Elimina un hospital' */
  /* #swagger.tags = ['Hospitales'] */
  /* #swagger.parameters['id'] = { description: 'ID del hospital', type: 'integer', required: true } */
  hospitalesController.deleteHospital(req, res);
});

module.exports = router;
