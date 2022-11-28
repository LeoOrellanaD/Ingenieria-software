const express = require('express');
const multaController = require('../controllers/multaController');
const api = express.Router();
const { validateMulta } = require('../validators/multaValidacion')

api.post('/multa',validateMulta, multaController.createMulta);
api.get('/multas', multaController.getMultas);
api.get('/multa/search/:cod_multa', multaController.getMulta);
api.get('/multa/search/:dia/:mes/:year', multaController.getMultaF);
api.delete('/multa/delete/:cod_multa', multaController.deleteMulta);

module.exports = api;