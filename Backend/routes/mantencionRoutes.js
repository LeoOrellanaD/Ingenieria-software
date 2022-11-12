const express = require('express');
const mantencionController = require('../controllers/mantencionController');
const api = express.Router();

api.post('/mantencion', mantencionController.createMantencion);
api.get('/mantenciones', mantencionController.getMantenciones);
api.get('/mantencion/search/:id', mantencionController.getMantencion);
api.put('/mantencion/update/:id', mantencionController.updateMantencion);
api.delete('/mantencion/delete/:id', mantencionController.deleteMantencion);

module.exports = api;