const Reserva = require('../models/reserva');
//var cont = 0;
//let cod = "";


function codigo() {
    // Reserva.countDocuments( function(error, count){
    //     if(error){
    //         console.log(error)
    // }
    //     console.log("numero de documentos", count);
    //     cont=count;

    // })
}

const createReserva = (req, res) => {
    // codigo();
    // console.log(cont);
    // const contador = cont.toString();
    // let cantidad = cont.length;
    // contador.padStart(5 - cantidad, "0");

    // cod = contador;

    const { dia, mes, year, hora, servicio, vecino, costo_base, costo_extra, num_reserva} = req.body
    const newReserva = new Reserva({
        dia,
        mes,
        year,
        hora,
        servicio,
        vecino,
        costo_base,
        costo_extra,
        num_reserva
    })


    // Reserva.find({dia, mes ,year, hora}).count( function(error, count){
    //         if(error){
    //             //console.log(error)
    //         }
    //     console.log(dia)
    //     console.log(mes)
    //     console.log(year)
    //     console.log(hora)
    //     console.log("Number of docs: ", count);

    //     if(count>3){
    //         return res.status(401).send({ message: "Horario no valido"})
    //         }
    // });

        newReserva.save((error, reserva) => {
        if(error){
            console.log(error)
            return res.status(400).send({ message: "No se ha podido crear la reserva"})
        }
        return res.status(201).send(reserva)
    })
}

const getReserva = (req, res) => {
    const { num_reserva} = req.params
    Reserva.find({num_reserva}).populate({ path: 'vecino servicio'}).exec((error, reserva) => {
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

const getReservaH = (req, res) => {
    const {hora, dia, mes, year} = req.params
    Reserva.find({hora, dia, mes, year}).populate({ path: 'vecino'}).exec((error, reserva) => {
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
        return res.status(200).send(reservas)
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



module.exports = {
    createReserva,
    getReserva,
    getReservaF,
    getReservaH,
    getReservaD,
    getReservas,
    deleteReserva
}


