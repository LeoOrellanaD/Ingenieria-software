const express = require('express')
const cobroController = require('../controllers/cobroController')
const api = express.Router()

api.post('/cobro', cobroController.createCobro)
api.get('/cobros', cobroController.getCobros)
api.put('/cobro/update/:id', cobroController.updateCobro)
module.exports = api