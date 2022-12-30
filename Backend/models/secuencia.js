const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecuenciaSchema = new Schema({
    nombre:{
        type: 'String',
        required: true,
    },
    valor:{
        type: Number,
        default: 1,
    }
})

module.exports = mongoose.model('secuencia', SecuenciaSchema);