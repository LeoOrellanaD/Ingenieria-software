const Reserva = require('../models/reserva');

const createReserva = (req, res) => {
    const { fecha, hora, servicio, vecino, costo_base, costo_extra } = req.body
    const newReserva = new Reserva({
        fecha,
        hora,
        servicio,
        vecino,
        costo_base,
        costo_extra
    })
    newReserva.save((error, reserva) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido crear la reserva"})
        }
        return res.status(201).send(reserva)
    })
}

const getReserva = (req, res) => {
    const { id } = req.params
    Reserva.findById(id, (error, reserva) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(!reserva){
            return res.status(404).send({ message: "No se ha encontrado la reserva"})
        }
        return res.status(200).send(reserva)
    })
}

const getReservas = (req, res) => {
    Reserva.find({}, (error, reservas) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(reservas.length === 0){
            return res.status(404).send({ message: "No se encontraron reservas"})
        }
        return res.status(200).send(reservas)
    })
}

const deleteReserva = (req, res) => {
    const { id } = req.params
    Reserva.findByIdAndDelete(id, (error, reserva) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido eliminar la reserva"})
        }
        if(!reserva){
            return res.status(404).send({ message: "No se ha podido encontrar la reserva"})
        }
        return res.status(200).send({ message: "Se ha elimnado la reserva correctamente"})
    })
}

module.exports = {
    createReserva,
    getReserva,
    getReservas,
    deleteReserva
}