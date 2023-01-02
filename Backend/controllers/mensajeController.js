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





module.exports = {
    createMensaje,
    getMensajes

}