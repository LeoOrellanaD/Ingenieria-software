const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateMensaje = [
    check('fecha').exists().not().isEmpty().matches(/^([0-2][0-9]|3[0-1])(-)(0[1-9]|1[0-2])\2(\d{4})$/),
    check('hora').exists().not().isEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('contenido').exists().not().isEmpty().isLength({min: 100, max: 200}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateMensaje }