const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateMantencion = [
    check('nombre_empresa').exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/),
    check('rut_empresa').exists().not().isEmpty().matches(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/),
    check('giro').exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/),
    check('descripcion').exists().not().isEmpty().isLength({min: 10, max: 200}),
    check('valor').exists().not().isEmpty().isInt({min:0}),
    check('dia').exists().not().isEmpty().isInt({min:1, max:31}),
    check('mes').exists().not().isEmpty().isInt({min:1,max:12}),
    check('year').exists().not().isEmpty().isInt({min:2022,max:2050}),
    check('hora').exists().not().isEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('observaciones').exists().isLength({min: 10, max: 200}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

const validateMantencionUpdate = [
    check('nombre_empresa').optional().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/),
    check('rut_empresa').optional().not().isEmpty().matches(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/),
    check('giro').optional().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/),
    check('descripcion').optional().not().isEmpty().isLength({min: 10, max: 200}),
    check('valor').optional().not().isEmpty().isInt({min:0}),
    check('dia').optional().not().isEmpty().isInt({min:1, max:31}),
    check('mes').optional().not().isEmpty().isInt({min:1,max:12}),
    check('year').optional().not().isEmpty().isInt({min:2022,max:2050}),
    check('hora').optional().not().isEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    check('observaciones').optional().isLength({min: 10, max: 200}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateMantencion, validateMantencionUpdate }