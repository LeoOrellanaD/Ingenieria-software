const express = require('express');
const vecinoController = require('../controllers/vecinoController');
const api = express.Router();
const { validateVecino, validateVecinoUpdate } = require('../validators/vecinoValidacion')

api.post('/vecino',validateVecino, vecinoController.createVecino);
api.post('/vecino/login', vecinoController.loginVecino);
api.get('/vecinos', vecinoController.getVecinos);
api.get('/vecino/search/:codigo', vecinoController.getVecino);
api.get('/vecino/search2/:id', vecinoController.getVecinoById);
api.put('/vecino/update/:codigo',validateVecinoUpdate, vecinoController.updateVecino);
api.put('/vecino/update/mensaje/:codigo',vecinoController.updateVecinoMen);
api.put('/vecino/update/estado/:codigo',vecinoController.updateVecinoEstado);
//api.delete('/vecino/delete/:codigo', vecinoController.deleteVecino);
api.get('/vecino/reservas/:codigo', vecinoController.getReservasVecino);
api.get('/vecino/multas/:codigo', vecinoController.getMultasVecino);
api.get('/vecino/mensajes/:codigo', vecinoController.getMensajesVecino);
api.get('/vecino/cobros/:codigo', vecinoController.getCobrosVecino);

module.exports = api;