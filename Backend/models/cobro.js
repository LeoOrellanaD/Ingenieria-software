const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cobroSchema = new Schema({
    costo_total:{
        type: 'Number',
        required: true,
        default: 0
    },
    multa_total:{
        type: 'Number',
        required: false
    },
    reserva_total:{
        type: 'Number',
        required: false
    },
    vecino:{
        type: Schema.ObjectId,
        ref: 'vecino',
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
    num_cobro: {
        type: 'String',
        required: true
    }
})

module.exports = mongoose.model('cobro', cobroSchema);