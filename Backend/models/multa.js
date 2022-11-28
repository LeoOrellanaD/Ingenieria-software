const mongoose = require('mongoose')
const Schema = mongoose.Schema
const multaSchema = new Schema({

    valor: {
        type: 'Number',
        required: true
    },
    tipo: {
        type:'String',
        required: true,
        enum:[
            'sancion leve',
            'sancion media',
            'sancion alta',
            'por cancelacion'
        ]
    },
    dia: {
        type: 'String',
        required: true
    },
    mes: {
        type: 'String',
        required: true
    },
    year: {
        type: 'String',
        required: true
    },
    vecino: {
        type: Schema.ObjectId,
        ref: 'vecino',
        required: true
    },
    cod_multa:{
        type: 'Number',
        required: true,
        unique: true
    }
})
module.exports = mongoose.model('multa', multaSchema)


