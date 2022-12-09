const express = require('express')
const administradorController = require('../controllers/administradorController')
const api = express.Router()
const { validateAdmin, validateAdminUpdate } = require('../validators/administradorValidacion')

api.post('/administrador', validateAdmin, administradorController.createAdministrador);
api.post('/administrador/login', administradorController.loginAdministrador);
api.get('/administrador/search/:codigo', administradorController.getAdministrador);
api.get('/administradores', administradorController.getAdministradores);
api.put('/administrador/update/:codigo',validateAdminUpdate, administradorController.updateAdministrador);
api.delete('/administrador/delete/:codigo', administradorController.deleteAdministrador);

module.exports = api;