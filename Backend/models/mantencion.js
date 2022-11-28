const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mantencionSchema = new Schema({
    nombre_empresa:{
        type: 'String',
        required: true
    },
    rut_empresa:{
        type: 'String',
        required: true
    },
    giro:{
        type: 'String',
        required: true
    },
    descripcion:{
        type: 'String',
        required: true
    },
    valor:{
        type: 'Number',
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
    hora:{
        type: 'String',
        required: true
    },
    observaciones:{
        type: 'String',
        required: false
    },
    num_mantencion:{
        type:'Number',
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('mantencion', mantencionSchema);
