const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCobro = [
    check('costo_total').exists().not().isEmpty().isInt({min:0}),
    check('multa_total').exists().not().isEmpty().isInt({min:0}),
    check('reserva_total').exists().not().isEmpty().isInt({min:0}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateCobro }
