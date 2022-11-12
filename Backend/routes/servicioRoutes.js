const express = require('express');
const servicioController = require('../controllers/servicioController');
const api = express.Router();

api.post('/servicio', servicioController.createServicio);
api.get('/servicios', servicioController.getServicios);
api.get('/servicio/search/:id', servicioController.getServicio);
api.put('/servicio/update/:id', servicioController.updateServicio);
api.delete('/servicio/delete/:id', servicioController.deleteServicio);

module.exports = api;