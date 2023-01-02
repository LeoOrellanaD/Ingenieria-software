const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const api = express.Router();
const { validateMensaje } = require('../validators/mensajeValidacion')

api.post('/mensaje',validateMensaje, mensajeController.createMensaje);
api.get('/mensajes', mensajeController.getMensajes);

module.exports = api;