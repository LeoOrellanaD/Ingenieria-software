const express = require('express');
const reservaController = require('../controllers/reservaController');
const api = express.Router();

api.post('/reserva', reservaController.createReserva);
api.get('/reservas', reservaController.getReservas);
api.get('/reserva/search/:id', reservaController.getReserva);
api.delete('/reserva/delete/:id', reservaController.deleteReserva);

module.exports = api;