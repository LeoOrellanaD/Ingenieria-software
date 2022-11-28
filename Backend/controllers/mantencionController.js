const Mantencion = require('../models/mantencion');
//let Contador = 0;
//let codigo;

const createMantencion = (req, res) => {
    //Contador = Contador + 1;
    //const cont = Contador.toString();
    //let cantidad = cont.length;

    //cont.padStart(5 - cantidad, "0");
    //codigo = cont;

    const { nombre_empresa, rut_empresa, giro, descripcion, valor, dia, mes, year, hora, observaciones, num_mantencion} = req.body
    const newMantencion = new Mantencion({
        nombre_empresa,
        rut_empresa,
        giro,
        descripcion,
        valor,
        dia,
        mes,
        year,
        hora,
        observaciones,
        num_mantencion
    })
    newMantencion.save((error, mantencion) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido crear la mantencion"})
        }
        return res.status(201).send(mantencion)
    })
}

const getMantencion = (req, res) => {
    const { num_mantencion } = req.params
    Mantencion.find({num_mantencion}, (error, mantencion) => {
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

const getMantencionH = (req, res) => {
    const {hora, dia, mes, year} = req.params
    Mantencion.find({hora, dia, mes, year}, (error, mantencion) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(!mantencion){
            return res.status(404).send({ message: "No se ha encontrado la mantencion"})
        }
        return res.status(200).send(mantencion)
    })
}

const getMantencionN = (req, res) => {
    const { nombre_empresa } = req.params
    Mantencion.find({nombre_empresa}, (error, mantencion) => {
        if(error){
            console.log(error);
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(!mantencion){
            return res.status(404).send({ message: "No se ha encontrado la mantencion"})
        }
        return res.status(200).send(mantencion)
    })
}

const deleteMantencion = (req, res) => {
    const { num_mantencion } = req.params
    Mantencion.findOneAndDelete({num_mantencion}, (error, mantencion) => {
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
    const { nombre_empresa, rut_empresa, giro, descripcion, valor, fecha, hora, observaciones } = req.body
    const { num_mantencion } = req.params
    Mantencion.findOneAndUpdate({num_mantencion}, { nombre_empresa, rut_empresa, giro, descripcion, valor, fecha, hora, observaciones }, (error, mantencion) => {
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
    getMantencionH,
    getMantencionN,
    deleteMantencion,
    updateMantencion
}