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
        rut:{
            type:'String',
            required: true,
            unique: true
        },
        vivienda:{
            type:'Number',
            required:true
        },
        horas:{
            type: 'Number',
            required: true
        },
        permiso:{
            type:'String',
            required:true,
            enum:[
                'habilitado',
                'inhabilitado'
            ]
        },
        codigo:{
            type: 'Number',
            required: true,
            unique: true
        }
    })

module.exports = mongoose.model('vecino', vecinoSchema);