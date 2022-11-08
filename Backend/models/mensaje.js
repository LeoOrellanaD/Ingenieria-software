const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({
    destinatario:[{
        type: Schema.ObjectId,
        ref: 'vecino',
        required: true
    }],
    remitente:{
        type: Schema.ObjectId,
        ref: 'administrador',
        required: true
    },
    fecha:{
        type: 'Date',
        required: true
    },
    hora:{
        type: 'String',
        required: true
    },
    contenido:{
        type: 'String',
        required: true
    }
})

module.exports = mongoose.model('mensaje', mensajeSchema);