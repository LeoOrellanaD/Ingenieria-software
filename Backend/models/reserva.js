const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reservaSchema = new Schema({
    fecha: {
        type: 'String',
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
    },
    costo_base:{
        type:'Number',
        required:true
    },
    costo_extra:{
        type:'Number',
        required:false,
        default: 0
    }
})
module.exports = mongoose.model('reserva', reservaSchema)