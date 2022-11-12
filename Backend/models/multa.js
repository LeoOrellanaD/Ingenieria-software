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
            'sancion leve',  //
            'sancion media', //
            'sancion alta',  //
            'por cancelacion'// gratis hasta 4 horas antes del uso y coste de 800*hora
        ]
    },
    fecha:{
        type:'Date',
        required:true
    },
    hora:{
        type:'String',
        required:true
    },
    vecino: {
        type: Schema.ObjectId,
        ref: 'vecino',
        required: true
    }
})
module.exports = mongoose.model('multa', multaSchema)


