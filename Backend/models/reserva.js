const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reservaSchema = new Schema({
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
    hora: {
        type:'String',
        required: true
    },
    servicio:{
        type: Schema.Types.ObjectId,
        ref:'servicio',
        required: true
    },
    vecino:{
        type: Schema.Types.ObjectId,
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
    },
    num_reserva:{
        type:'Number',
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('reserva', reservaSchema)