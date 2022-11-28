const express = require('express')
const cobroController = require('../controllers/cobroController')
const api = express.Router()
const { validateCobro, validateCobroUpdate } = require('../validators/cobroValidacion')

api.post('/cobro', validateCobro, cobroController.createCobro)
api.get('/cobros', cobroController.getCobros)
api.get('/cobros/search/:mes/:year', cobroController.getCobroF)
api.put('/cobro/update/:num_cobro', validateCobroUpdate, cobroController.updateCobro)
api.delete('/cobro/delete/:num_cobro', cobroController.deleteCobro)

module.exports = api;