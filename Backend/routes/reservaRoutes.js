const express = require('express');
const reservaController = require('../controllers/reservaController');
const api = express.Router();
const { validateReserva } = require('../validators/reservaValidacion')

api.post('/reserva/:codigo',validateReserva, reservaController.createReserva);
api.get('/reservas', reservaController.getReservas);
api.get('/reserva/search/:num_reserva', reservaController.getReserva);
api.get('/reserva/search/:mes/:year', reservaController.getReservaF);
api.get('/reserva/search/:dia/:mes/:year', reservaController.getReservaD);
api.get('/reserva/search/:hora/:dia/:mes/:year', reservaController.getReservaH);
api.delete('/reserva/delete/:num_reserva', reservaController.deleteReserva);
api.delete('/reserva/delete/:vecino', reservaController.deleteReservas );

module.exports = api;