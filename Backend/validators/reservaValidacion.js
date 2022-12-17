const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateReserva = [
    check('dia').exists().not().isEmpty().isInt({min:1, max:31}),
    check('mes').exists().not().isEmpty().isInt({min:1,max:12}),
    check('year').exists().not().isEmpty().isInt({min:2022,max:2050}),
    check('hora').exists().not().isEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('costo_base').exists().not().isEmpty().isInt({min:0}),
    check('costo_extra').exists().not().isEmpty().isInt({min:0}),


    (req, res ,next) => {
        validateResult(req,res,next)
    }
]


module.exports = { validateReserva }