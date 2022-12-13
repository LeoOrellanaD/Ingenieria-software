const Mensaje = require('../models/mensaje');

const createMensaje = (req, res) => {
    const { vecino, administrador, dia, mes, year,asunto, contenido } = req.body
    const newMensaje = new Mensaje({
        vecino,
        administrador,
        dia,
        mes,
        year,
        asunto,
        contenido
    })
    newMensaje.save((error, mensaje) => {
        if(error){
            console.log(error);
            return res.status(400).send({ message: "No se ha podido crear el mensaje"})
        }
        return res.status(201).send(mensaje)
    })
}

const getMensajes = (req, res) => {
    Mensaje.find({}).populate({ path: 'vecino administrador' }).exec((error, mensajes) => {
        if(error){
            return res.status(400).send({ message: "No se pudo realizar la busqueda"})
        }
        if(mensajes.length === 0){
            return res.status(404).send({ message: "No se encontraron mensajes"})
        }
        return res.status(200).send(mensajes)
    })
}

const getMensajeF = (req, res) => {
    const {mes, year} = req.params
    Mensaje.find({mes, year}).populate({ path: 'vecino'}).exec((error, mensaje) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(!mensaje){
            return res.status(404).send({ message: "No se ha encontrado el mensaje"})
        }
        return res.status(200).send(mensaje)
    })
}

const getMensajeD = (req, res) => {
    const {dia, mes, year} = req.params
    Mensaje.find({dia, mes, year}).populate({ path: 'vecino'}).exec((error, mensaje) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(!mensaje){
            return res.status(404).send({ message: "No se ha encontrado el mensaje"})
        }
        return res.status(200).send(mensaje)
    })
}

module.exports = {
    createMensaje,
    getMensajes,
    getMensajeF,
    getMensajeD
}