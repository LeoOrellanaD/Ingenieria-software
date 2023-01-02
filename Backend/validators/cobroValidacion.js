const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCobro = [
    //check('costo_total').exists().not().isEmpty().isInt({min:0}),
    check('multa_total').exists().not().isEmpty().isInt({min:0}),
    check('reserva_total').exists().not().isEmpty().isInt({min:6000}),
    check('mes').exists().not().isEmpty().isInt({min:1,max:12}),
    check('year').exists().not().isEmpty().isInt({min:2022,max:2050}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

const validateCobroUpdate = [
    check('costo_total').optional().not().isEmpty().isInt({min:0}),
    check('multa_total').optional().not().isEmpty().isInt({min:0}),
    check('reserva_total').optional().not().isEmpty().isInt({min:6000}),
    check('mes').optional().not().isEmpty().isInt({min:1,max:12}),
    check('year').optional().not().isEmpty().isInt({min:2022,max:2050}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateCobro, validateCobroUpdate }
