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
    fecha:{
        type: 'String',
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