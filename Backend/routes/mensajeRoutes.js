const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const api = express.Router();
const { validateMensaje } = require('../validators/mensajeValidacion')

api.post('/mensaje/:codigo',validateMensaje, mensajeController.createMensaje);
api.get('/mensajes', mensajeController.getMensajes);
api.get('/mensajes/search/:mes/:year', mensajeController.getMensajeF);
api.get('/mensajes/search/:dia/:mes/:year', mensajeController.getMensajeD);

module.exports = api;