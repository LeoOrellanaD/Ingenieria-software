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
api.get('/vecino/reservas/:codigo', vecinoController.getReservasVecino);
api.get('/vecino/multas/:codigo', vecinoController.getMultasVecino);
api.get('/vecino/mensajes/:codigo', vecinoController.getMensajesVecino);
api.get('/vecino/cobros/:codigo', vecinoController.getCobrosVecino);

module.exports = api;