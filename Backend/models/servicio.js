const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicioSchema = new Schema({
        nombre:{
                type:'String',
                required:true,
                enum:[
                        'lavadora',
                        'secadora'
                ]
        },
        costo:{
                type:'Number',
                required:true
                }
})

module.exports = mongoose.model('servicio',servicioSchema);
