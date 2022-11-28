const express = require('express');
const servicioController = require('../controllers/servicioController');
const api = express.Router();
const { validateServicio, validateServicioUpdate } = require('../validators/servicioValidacion')

api.post('/servicio',validateServicio, servicioController.createServicio);
api.get('/servicios', servicioController.getServicios);
api.put('/servicio/update/:nombre',validateServicioUpdate, servicioController.updateServicio);
api.delete('/servicio/delete/:nombre', servicioController.deleteServicio);

module.exports = api;