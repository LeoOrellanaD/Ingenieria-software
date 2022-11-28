const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateServicio = [
    check('nombre').exists().not().isEmpty().matches(/^[a-z ,.'-]+$/),
    check('costo').exists().isInt({min:6000, max:8000}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]
const validateServicioUpdate = [
    check('nombre').optional().not().isEmpty().matches(/^[a-z ,.'-]+$/),
    check('costo').optional().isInt({min:6000, max:8000}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateServicio, validateServicioUpdate }