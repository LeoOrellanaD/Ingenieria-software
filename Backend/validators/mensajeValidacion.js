const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateMensaje = [
    check('dia').exists().not().isEmpty().isInt({min:1, max:31}).withMessage("fallo el dia"),
    check('mes').exists().not().isEmpty().isInt({min:1,max:12}).withMessage("fallo el mes"),
    check('year').exists().not().isEmpty().isInt({min:2022,max:2050}).withMessage("fallo el año"),
    check('contenido').exists().not().isEmpty().isLength({min: 10, max: 200}).withMessage("fallo el contenido"),
    


    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateMensaje }