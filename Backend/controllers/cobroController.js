const Cobro = require('../models/cobro');

const createCobro = (req, res) => {
    const { multa_total, reserva_total, vecino} = req.body
    const newCobro = new Cobro({
        multa_total,
        reserva_total,
        vecino,
        costo_total : (multa_total + reserva_total)
    })
    newCobro.save((error, cobro) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido crear el cobro"})
        }
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
    Cobro.findByIdAndUpdate(id, req.body, (error, cobro) => {
        if(error){
            return res.status(400).send({ message: "No se pudo actualizar el cobro"})
        }
        if(!cobro){
            return res.status(404).send({ message: "No se encontró el cobro"})
        }
        if(req.body.multa_total){
            cobro.costo_total = (req.body.multa_total + cobro.reserva_total);
        }
        if(req.body.reserva_total){
            cobro.costo_total = (req.body.reserva_total + cobro.multa_total);
        }
        if(req.body.multa_total && req.body.reserva_total){
            cobro.costo_total = (req.body.multa_total + req.body.reserva_total);
        }
        cobro.save();
        return res.status(200).send({ message: "Cobro modificado correctamente"})
    })
}

const deleteCobro = (req, res) => {
    const { id } = req.params
    Cobro.findByIdAndDelete(id, (error, cobro) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido eliminar el cobro"})
        }
        if(!cobro){
            return res.status(404).send({ message: "No se ha podido encontrar el cobro"})
        }
        return res.status(200).send({ message: "Se ha eliminado el cobro correctamente"})
    })
}

module.exports ={
    createCobro,
    getCobros,
    updateCobro,
    deleteCobro
}