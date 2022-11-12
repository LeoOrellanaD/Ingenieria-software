const express = require('express');
const multaController = require('../controllers/multaController');
const api = express.Router();

api.post('/multa', multaController.createMulta);
api.get('/multas', multaController.getMultas);
api.get('/multa/search/:id', multaController.getMulta);
api.delete('/multa/delete/:id', multaController.deleteMulta);

module.exports = api;