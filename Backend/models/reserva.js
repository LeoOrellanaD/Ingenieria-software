const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reservaSchema = new Schema({

    fecha: {
        type: 'Date',
        required: true
    },
    hora: {
        type:'String',
        required: true
    },
    servicio:{
        type: Schema.ObjectId,
        ref:'servicio',
        required: true
    },
    vecino:{
        type: Schema.ObjectId,
        ref:'vecino',
        required: true
    }

})
module.exports = mongoose.model('reserva', reservaSchema)


