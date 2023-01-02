const express = require('express');
const mantencionController = require('../controllers/mantencionController');
const api = express.Router();
const { validateMantencion, validateMantencionUpdate } = require('../validators/mantencionValidacion')

api.post('/mantencion',validateMantencion, mantencionController.createMantencion);
api.get('/mantenciones', mantencionController.getMantenciones);
api.get('/mantencion/search/:num_mantencion', mantencionController.getMantencion);
api.put('/mantencion/update/:num_mantencion',validateMantencionUpdate, mantencionController.updateMantencion);
api.delete('/mantencion/delete/:num_mantencion', mantencionController.deleteMantencion);

module.exports = api;