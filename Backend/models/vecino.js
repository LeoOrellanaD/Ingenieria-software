const mongoose = require('mongoose');
const reserva = require('./reserva');
const mensaje = require('./mensaje');
const multa = require('./multa');
const cobro = require('./cobro');

const Schema = mongoose.Schema;

const vecinoSchema = new Schema({
        nombre:{
            type:'String',
            required:true
        },
        apellido:{
            type:'String',
            required:true
        },
        rut:{
            type:'String',
            required: true,
            unique: true
        },
        vivienda:{
            type:'Number',
            required:true
        },
        permiso:{
            type:'String',
            required:true,
            enum:[
                'habilitado',
                'inhabilitado'
            ]
        },
        horas:{
            type: 'Number',
            required: true
        },
        codigo:{
            type: 'Number',
            required: true,
            unique: true
        },
        reservas:[{
            type: Schema.ObjectId,
            ref: reserva,
            require: false
        }],
        multas:[{
            type: Schema.ObjectId,
            ref: multa,
            require: false
        }],
        mensajes:[{
            type: Schema.ObjectId,
            ref: mensaje,
            require: false
        }],
        cobros:[{
            type: Schema.ObjectId,
            ref: cobro,
            require: false
        }]
    })

module.exports = mongoose.model('vecino', vecinoSchema);