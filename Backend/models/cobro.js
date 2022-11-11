const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cobroSchema = new Schema({
    costo_total:{
        type: 'Number',
        required: true
    },
    multa_total:{
        type: 'Number',
        required: false
    },
    reserva_total:{
        type: 'Number',
        required: true
    },
    vecino:{
        type: Schema.ObjectId,
        ref: 'vecino',
        required: true
    }
})

module.exports = mongoose.model('cobro', cobroSchema);