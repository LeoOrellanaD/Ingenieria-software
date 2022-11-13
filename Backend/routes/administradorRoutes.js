const express = require('express')
const administradorController = require('../controllers/administradorController')
const api = express.Router()
const { validateAdmin } = require('../validators/administradorValidacion')

api.post('/administrador', validateAdmin, administradorController.createAdministrador);
api.post('/administrador/login', administradorController.loginAdministrador);
api.get('/administradores', administradorController.getAdministradores);
api.put('/administrador/update/:id', administradorController.updateAdministrador);
api.delete('/administrador/delete/:id', administradorController.deleteAdministrador);

module.exports = api;