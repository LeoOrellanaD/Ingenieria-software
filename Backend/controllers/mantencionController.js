const Mantencion = require('../models/mantencion');

const createMantencion = (req, res) => {
    const { nombre_empresa, rut_empresa, giro, descripcion, valor, fecha, hora, observaciones} = req.body
    const newMantencion = new Mantencion({
        nombre_empresa,
        rut_empresa,
        giro,
        descripcion,
        valor,
        fecha,
        hora,
        observaciones
    })
    newMantencion.save((error, mantencion) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido crear la mantencion"})
        }
        return res.status(201).send(mantencion)
    })
}

const getMantencion = (req, res) => {
    const { id } = req.params
    Mantencion.findById(id, (error, mantencion) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(!mantencion){
            return res.status(404).send({ message: "No se ha encontrado la mantencion"})
        }
        return res.status(200).send(mantencion)
    })
}

const getMantenciones = (req, res) => {
    Mantencion.find({}, (error, mantenciones) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(mantenciones.length === 0){
            return res.status(404).send({ message: "No se ha encontrado mantenciones"})
        }
        return res.status(200).send(mantenciones)
    })
}

const deleteMantencion = (req, res) => {
    const { id } = req.params
    Mantencion.findByIdAndDelete(id, (error, mantencion) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido eliminar la mantencion"})
        }
        if(!mantencion){
            return res.status(404).send({ message: "No se ha podido encontrar la mantencion"})
        }
        return res.status(200).send({ message: "Se ha eliminado la mantencion correctamente"})
    })
}

const updateMantencion = (req, res) => {
    const { id } = req.params
    Mantencion.findByIdAndUpdate(id, req.body, (error, mantencion) => {
        if(error){
            return res.status(400).send({ message: "No se pudo actualizar la mantencion"})
        }
        if(!mantencion){
            return res.status(404).send({ message: "No se encontro la mantencion"})
        }
        return res.status(200).send({ message: "Mantencion modificada"})
    })
}

module.exports = {
    createMantencion,
    getMantencion,
    getMantenciones,
    deleteMantencion,
    updateMantencion
}