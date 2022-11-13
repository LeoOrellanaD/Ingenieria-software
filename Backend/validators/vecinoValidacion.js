const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateVecino = [
    check('nombre').exists().not().isEmpty().matches(/^[a-z ,.'-]+$/),
    check('apellido').exists().not().isEmpty().matches(/^[a-z ,.'-]+$/),
    check('rut').exists().not().isEmpty().matches(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/),
    check('vivienda').exists.isInt({min:1 , max:100}),
    check('horas').exists().isInt(),
    check('codigo').exists().isInt({min:2001, max:3000}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateVecino}