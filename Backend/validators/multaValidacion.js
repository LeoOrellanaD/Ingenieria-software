const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateMulta = [
    check('valor').exists().isInt({min:1000}),
    check('dia').exists().not().isEmpty().isInt({min:1, max:31}),
    check('mes').exists().not().isEmpty().isInt({min:1,max:12}),
    check('year').exists().not().isEmpty().isInt({min:2022,max:2050}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateMulta }