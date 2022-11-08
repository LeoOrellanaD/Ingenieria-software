const mongoose = require('mongoose')
const Schema = mongoose.Schema
const multaSchema = new Schema({

    valor: {
        type: 'Number',
        required: true
    },
    causa: {
        type:'String',
        required: true
    },
    test: {
        type:'Number',
        required: true
    }
})
module.exports = mongoose.model('multa', multaSchema)


