const express = require('express');
const vecinoController = require('../controllers/vecinoController');
const api = express.Router();

api.post('/vecino', vecinoController.createVecino);
api.post('/vecino/login', vecinoController.loginVecino);
api.get('/vecinos', vecinoController.getVecinos);
api.get('/vecino/search/:id', vecinoController.getVecino);
api.put('/vecino/update/:id', vecinoController.updateVecino);
api.delete('/vecino/delete/:id', vecinoController.deleteVecino);

module.exports = api;