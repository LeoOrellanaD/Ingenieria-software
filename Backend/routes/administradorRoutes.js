const express = require('express')
const administradorController = require('../controllers/administradorController')
const api = express.Router()

api.post('/administrador', administradorController.createAdministrador);
api.post('/administrador/login', administradorController.loginAdministrador);
api.put('/administrador/update/:id', administradorController.updateAdministrador);
api.delete('administrador/delete/:id', administradorController.deleteAdministrador);

module.exports = api