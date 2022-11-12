const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cobroSchema = new Schema({
    costo_total:{
        type: 'Number',
        required: true,
        default: 0
    },
    multa_total:{
        type: Number,
        //ref: 'multa',
        required: false
    },
    reserva_total:{
        type: Number,
        //ref: 'reserva',
        required: false
    },
    vecino:{
        type: Schema.ObjectId,
        ref: 'vecino',
        required: true
    }
})

module.exports = mongoose.model('cobro', cobroSchema);