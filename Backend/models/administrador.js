const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const administradorSchema = new Schema({
    nombre:{
        type: 'String',
        required: true
    },
    apellido:{
        type: 'String',
        required: true
    },
    rut:{
        type: 'String',
        required: true,
        unique:true
    },
    telefono:{
        type: 'String',
        required: true
    }
})

module.exports = mongoose.model('administrador', administradorSchema);