const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const api = express.Router();

api.post('/mensaje', mensajeController.createMensaje);
api.get('/mensajes', mensajeController.getMensajes);
api.delete('/mensaje/delete/:id', mensajeController.deleteMensaje);

module.exports = api;