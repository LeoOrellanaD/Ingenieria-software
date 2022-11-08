const mongoose = require('mongoose');
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
        correo:{
            type: 'String',
            required: true
        },
        password:{
            type: 'String',
            required: true
        },
        Horas_Mensuales:{
            type: 'Number',
            required: true
        }
    })

module.exports = mongoose.model('vecino', vecinoSchema);