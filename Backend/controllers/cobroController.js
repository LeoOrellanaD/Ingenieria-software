const Cobro = require('../models/cobro');
const Vecino = require('../models/vecino');

const createCobro = (req, res) => {
    const { multa_total, reserva_total, vecino, mes, year} = req.body
    const {codigo}= req.params
    Cobro.countDocuments({},(error,count) =>{
        const num = String(count+1).padStart(5,'0');
        const newCobro = new Cobro({
            multa_total,
            reserva_total,
            vecino,
            costo_total : (multa_total + reserva_total),
            mes,
            year,
            num_cobro: num
        })
        newCobro.save((error, cobro) => {
            if(error){
                return res.status(400).send({ message: "No se ha podido crear el cobro"})
            }
            Vecino.updateOne({ codigo: codigo }, { $push: { cobros: cobro._id } }, (error) => {
                if (error) {
                    console.log(error)
                    return res.status(400).send({ message: "Error al actualizar el vecino" })
                }
            })
            return res.status(201).send(cobro)
        })
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
    const { num_cobro } = req.params
    Cobro.findOneAndUpdate({num_cobro}, req.body, (error, cobro) => {
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
    const { num_cobro } = req.params
    Cobro.findOneAndDelete({num_cobro}, (error, cobro) => {
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