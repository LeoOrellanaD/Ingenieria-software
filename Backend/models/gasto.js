const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gastoSchema = new Schema(
{
    gasto_total_mensual:
    {
        type: 'Number',
        required:true
    },
    gasto_detallado:
    [{
        type: 'Number',
        required:true
    }],
    cargos_adicionales:
    [{
        type: Schema.ObjectId,
        ref: 'multa',
        required:false
    }],
    vecino:
    {
        type: Schema.ObjectId,
        ref: 'vecino',
        required:true
    }
})

module.exports = mongoose.model('gasto', gastoSchema);