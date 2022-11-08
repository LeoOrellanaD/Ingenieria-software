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
    description:{
        type: 'String',
        required: true
    },
    valor:{
        type: 'Number',
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
    observaciones:{
        type: 'String',
        required: false
    }
})

module.exports = mongoose.model('mantencion', mantencionSchema);
