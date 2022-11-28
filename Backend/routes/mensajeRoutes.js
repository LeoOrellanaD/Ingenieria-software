const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const api = express.Router();
const { validateMensaje } = require('../validators/mensajeValidacion')

api.post('/mensaje',validateMensaje, mensajeController.createMensaje);
api.get('/mensajes', mensajeController.getMensajes);
api.get('/mensajes/search/:mes/:year', mensajeController.getMensajeF);
api.get('/mensajes/search/:dia/:mes/:year', mensajeController.getMensajeD);
api.delete('/mensaje/delete/:id', mensajeController.deleteMensaje);

module.exports = api;