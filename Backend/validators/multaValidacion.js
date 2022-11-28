const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateMulta = [
    check('valor').exists().isInt({min:0}),
    check('dia').exists().not().isEmpty().isInt({min:1, max:31}),
    check('mes').exists().not().isEmpty().isInt({min:1,max:12}),
    check('year').exists().not().isEmpty().isInt({min:2022,max:2050}),
    check('hora').exists().not().isEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateMulta }