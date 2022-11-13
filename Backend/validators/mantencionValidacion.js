const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateMantencion = [
    check('nombre_empresa').exists().not().isEmpty().matches(/^[a-z ,.'-]+$/),
    check('rut_empresa').exists().not().isEmpty().matches(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/),
    check('giro').exists().not().isEmpty().matches(/^[a-z ,.'-]+$/),
    check('descripcion').exists().not().isEmpty().isLength({min: 100, max: 200}),
    check('valor').exists().not().isEmpty().isInt({min:0}),
    check('fecha').exists().not().isEmpty().matches(/^([0-2][0-9]|3[0-1])(-)(0[1-9]|1[0-2])\2(\d{4})$/),
    check('hora').exists().not().isEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('observaciones').exists().isLength({min: 100, max: 200}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateMantencion }