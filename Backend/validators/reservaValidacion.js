const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateReserva = [
    check('fecha').exists().not().isEmpty().matches(/^([0-2][0-9]|3[0-1])(-)(0[1-9]|1[0-2])\2(\d{4})$/),
    check('hora').exists().not().isEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('costo_base').exists().not().isEmpty().isInt({min:0}),
    check('costo_extra').exists().not().isEmpty().isInt({min:0}),


    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateReserva }