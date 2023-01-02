const express = require('express');
const reservaController = require('../controllers/reservaController');
const api = express.Router();
const { validateReserva } = require('../validators/reservaValidacion')

api.post('/reserva/:codigo',validateReserva, reservaController.createReserva);
api.get('/reservas', reservaController.getReservas);
api.get('/reserva/search/:num_reserva', reservaController.getReserva);
api.get('/reserva/search/:mes/:year', reservaController.getReservaF);
api.get('/reserva/search/:dia/:mes/:year', reservaController.getReservaD);
api.delete('/reserva/delete/:num_reserva', reservaController.deleteReserva);
api.delete('/reserva/delete/:vecino', reservaController.deleteReservas );
api.put('/reserva/update/:num_reserva', reservaController.updateReserva );

module.exports = api;
