const Mensaje = require('../models/mensaje');

const createMensaje = (req, res) => {
    const { destinatario, remitente, fecha, hora, contenido } = req.body
    const newMensaje = new Mensaje({
        destinatario,
        remitente,
        fecha,
        hora,
        contenido
    })
    newMensaje.save((error, product) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido crear el mensaje"})
        }
        return res.status(201).send(mensaje)
    })
}

const getMensajes = (req, res) => {
    Mensaje.find({}, (error, mensajes) => {
        if(error){
            return res.status(400).send({ message: "No se pudo realizar la busqueda"})
        }
        if(mensajes.length === 0){
            return res.status(404).send({ message: "No se encontraron mensajes"})
        }
        return res.status(200).send(mensajes)
    })
}

const deleteMensaje = (req, res) => {
    const { id } = req.params
    Mensaje.findByIdAndDelete(id, (error, mensaje) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido eliminar el mensaje"})
        }
        if(!mensaje){
            return res.status(404).send({ message: "No se ha encontrado el mensaje"})
        }
        return res.status(200).send({ message: "Se ha eliminado el mensaje correctamente"})
    })
}

module.exports = {
    createMensaje,
    getMensajes,
    deleteMensaje
}