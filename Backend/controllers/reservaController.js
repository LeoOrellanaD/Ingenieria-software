const Reserva = require('../models/reserva');
const Vecino = require('../models/vecino');
const Secuencia = require('../models/secuencia');

const createReserva = async (req, res) => {
    const { dia, mes, year, hora, servicio, vecino, costo_base, costo_extra} = req.body
    const {codigo} =req.params

    const count= await Reserva.countDocuments({dia,mes,year,hora});

        if(count>=3){
            return res.status(400).send({message:"No se puede agregar otra reserva en este horario"});
        }

            const secuencia = await Secuencia.findOneAndUpdate(
                { nombre: "reservas" },
                { $inc: { valor: 1 } },
                { new: true, upsert: true }
            );
            const num = secuencia.valor.toString().padStart(5, "0");

            const newReserva = new Reserva({
                dia,
                mes,
                year,
                hora,
                servicio,
                vecino,
                costo_base,
                costo_extra,
                num_reserva : num
            })

             newReserva.save((error, reserva) => {
                if(error){
                    console.log(error)
                    return res.status(400).send({ message: "No se ha podido crear la reserva"})
                }
                 Vecino.updateOne({ codigo: codigo }, { $push: { reservas: reserva._id } }, (error) => {
                    if (error) {
                        console.log(error)
                        return res.status(400).send({ message: "Error al actualizar el vecino" })
                    }
                })
                return res.status(201).send(reserva)
        })


    }



const getReserva = (req, res) => {
    const { num_reserva} = req.params
    Reserva.findOne({num_reserva}).populate({ path: 'vecino servicio'}).exec((error, reserva) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(!reserva){
            return res.status(404).send({ message: "No se ha encontrado la reserva"})
        }
        return res.status(200).send(reserva)
    })
}

const getReservaF = (req, res) => {
    const {mes, year} = req.params
    Reserva.find({mes, year}).populate({ path: 'vecino'}).exec((error, reserva) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(!reserva){
            return res.status(404).send({ message: "No se ha encontrado la reserva"})
        }
        return res.status(200).send(reserva)
    })
}


const getReservaD = (req, res) => {
    const {dia, mes, year} = req.params
    Reserva.find({dia, mes, year}).populate({ path: 'vecino'}).exec((error, reserva) => {
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
    Reserva.find({}).populate({ path: 'vecino servicio' }).exec((error, reservas) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(reservas.length === 0){
            return res.status(404).send({ message: "No se encontraron reservas"})
        }
        let reservasordenadas= reservas.sort((a, b) => (a.dia && a.mes && a.year - b.dia && b.mes && b.year));

        return res.status(200).send(reservasordenadas)
    })
}

const deleteReserva = (req, res) => {
    const { num_reserva } = req.params
    Reserva.findOneAndDelete({num_reserva}, (error, reserva) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido eliminar la reserva"})
        }
        if(!reserva){
            return res.status(404).send({ message: "No se ha podido encontrar la reserva"})
        }
        return res.status(200).send({ message: "Se ha elimnado la reserva correctamente"})
    })
}
const deleteReservas = (req, res) =>
{
    const { vecino } = req.params
    Reserva.findOneAndDelete({ vecino }, (error, reserva) =>
    {
        if(error){
            return res.status(400).send({ message: "No se han podido eliminar las reservas"})
        }
        if(!reserva){
            return res.status(404).send({ message: "No se ha podido encontrar la reserva"})
        }
        return res.status(200).send({ message: "Se ha elimnado la reserva correctamente"})
    })
}

const updateReserva = (req, res) =>{
    const {costo_extra} = req.body;
    const {num_reserva} = req.params;
    Reserva.findOneAndUpdate({num_reserva}, {costo_extra}, (error, reserva) =>{
        if(error){
            return res.status(400).send({message: 'Error al actualizar reserva'});
        }
        if(!reserva){
            return res.status(404).send({message:'No se encontro la reserva'});
        }
        return res.status(200).send(reserva);
    })
}



module.exports = {
    createReserva,
    getReserva,
    getReservaF,
    getReservaD,
    getReservas,
    deleteReserva,
    deleteReservas,
    updateReserva
}


