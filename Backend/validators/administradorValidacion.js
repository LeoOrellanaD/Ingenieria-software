const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateAdmin = [

    check('nombre').exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/),
    check('apellido').exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/),
    check('rut').exists().not().isEmpty().matches(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/),
    check('telefono').exists().matches(/^(\+?56){1}(9)[98765]\d{7}$/),
    check('codigo').exists().isInt({min:1000,max:2000}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]
const validateAdminUpdate = [

    check('nombre').optional().exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/),
    check('apellido').optional().exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/),
    check('rut').optional().exists().not().isEmpty().matches(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/),
    check('telefono').optional().exists().matches(/^(\+?56){1}(9)[98765]\d{7}$/),
    //check('codigo').optional().exists().isInt({min:1000,max:2000}),

    (req, res ,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { validateAdmin, validateAdminUpdate }