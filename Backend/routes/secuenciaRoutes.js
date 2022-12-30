const express = require('express');
const secuenciaController = require('../controllers/secuenciaController')
const api= express.Router();

api.post('/secuencia',secuenciaController.CreateSecuencia);

module.exports=api;