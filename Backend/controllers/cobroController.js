const Cobro = require('../models/cobro');

const createCobro = (req, res) => {
    const { costo_total, multa_total, reserva_total, vecino} = req.body
    const newCobro = new Cobro({
        costo_total,
        multa_total,
        reserva_total,
        vecino
    })
    newCobro.save((error, cobro) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido crear el cobro"})
        }
        /*
        cobro.aggregate([
            {
                $match:{
                    vecino.rut: $vecino.rut
                }
            },
            {
                $group: {
                _id: $vecino.rut,
                multa: {
                    $sum: $multa_total
                },
                reserva:{
                    $sum: $reserva_total
                }
                }
            },
            {
                costo_total: multa + reserva
            }
        ])*/
        return res.status(201).send(cobro)
    })
}

const getCobros = (req, res) => {
    Cobro.find({}).populate({ path: 'vecino' }).exec((error, cobros) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(cobros.length === 0){
            return res.status(404).send({ message: "No se encontraron cobros"})
        }
        return res.status(200).send(cobros)
    })
}

const updateCobro = (req, res) => {
    const { id } = req.params
    Cobro.findByIdAndUpdate(id, req.body, (error, product) => {
        if(error){
            return res.status(400).send({ message: "No se pudo actualizar el cobro"})
        }
        if(!cobro){
            return res.status(404).send({ message: "No se encontró el cobro"})
        }
        return res.status(200).send({ message: "Cobro modificado correctamente"})

    })
}

module.exports ={
    createCobro,
    getCobros,
    updateCobro
}