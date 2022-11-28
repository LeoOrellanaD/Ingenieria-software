const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({
    vecino:[{
        type: Schema.Types.ObjectId,
        ref: 'vecino',
        required: true
    }],
    administrador:{
        type: Schema.ObjectId,
        ref: 'administrador',
        required: true
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
    contenido:{
        type: 'String',
        required: true
    }
})

module.exports = mongoose.model('mensaje', mensajeSchema);