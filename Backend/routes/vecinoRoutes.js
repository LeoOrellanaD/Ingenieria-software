const express = require('express');
const vecinoController = require('../controllers/vecinoController');
const api = express.Router();
const { validateVecino, validateVecinoUpdate } = require('../validators/vecinoValidacion')

api.post('/vecino',validateVecino, vecinoController.createVecino);
api.post('/vecino/login', vecinoController.loginVecino);
api.get('/vecinos', vecinoController.getVecinos);
api.get('/vecino/search/:codigo', vecinoController.getVecino);
api.put('/vecino/update/:codigo',validateVecinoUpdate, vecinoController.updateVecino);
api.delete('/vecino/delete/:codigo', vecinoController.deleteVecino);

module.exports = api;