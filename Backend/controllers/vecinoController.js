const Vecino = require('../models/vecino');


const createVecino = (req, res)=>{
    const{nombre, apellido, rut, vivienda, permiso, horas ,codigo, reservas, cobros, mensajes, multas} = req.body;
    const newVecino = new Vecino({
            nombre,
            apellido,
            rut,
            vivienda,
            permiso,
            horas,
            codigo,
            reservas,
            cobros,
            mensajes,
            multas
        });
    newVecino.save((error, vecino) => {
        if(error){
            return res.status(400).send({message:'Error al crear vecino'})
        }
        return res.status(201).send(vecino);
    })
}

const loginVecino = (req, res) => {
    const {codigo} =req.body;
    Vecino.findOne({codigo}, (error, vecino) => {
        if(error){
            return res.status(400).send({message: 'Error al inciar sesion'})
        }
        if(!vecino){
            return res.status(404).send({message: 'No se encontro usuario'})
        }
        if(vecino.permiso === 'inhabilitado'){
            return res.status(401).send({message:'Vecino Inhabilitado por favor comunicarse con su Adminstrador'})
        }

        return res.status(200).send(vecino);
    })
}

const getVecinos = (req, res) => {
    Vecino.find({}, (error, vecinos) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener los vecinos' });
        }
        if(vecinos.length === 0){
            return res.status(404).send({ message: "No se encontraron vecinos"})
        }
        return res.status(200).send(vecinos);
    })
}

const getVecino = (req, res) =>{
    const{ codigo } = req.params;
    Vecino.findOne({codigo}, (error, vecino) =>{
        if(error) {
            return res.status(400).send({message:'Error al obtener vecino'});
        }
        if(!vecino){
            return res.status(404).send({message:'No se encontro al vecino'});
        }
        return res.status(200).send(vecino);
    })
}

const getVecinoById = (req, res) =>{
    const{ id } = req.params;
    Vecino.findById(id, (error, vecino) =>{
        if(error) {
            return res.status(400).send({message:'Error al obtener vecino'});
        }
        if(!vecino){
            return res.status(404).send({message:'No se encontro al vecino'});
        }
        return res.status(200).send(vecino);
    })
}

const updateVecino = (req, res) =>{
    const {permiso, horas} = req.body;
    const {codigo} = req.params;
    Vecino.findOneAndUpdate({codigo}, {permiso, horas}, (error, vecino) =>{
        if(error){
            return res.status(400).send({message: 'Error al actualizar vecino'});
        }
        if(!vecino){
            return res.status(404).send({message:'No se encontro vecino'});
        }
        return res.status(200).send(vecino);
    })
}

const updateVecinoMen = (req,res) => {
    const { mensajes } = req.body;
    const { codigo } = req.params;
    console.log(mensajes)
    Vecino.updateOne({ codigo: codigo }, { $push: { mensajes: mensajes} }, (error,vecino) => {
    if (error ) {
        console.log(error)
        return res.status(400).send({ message: "Error al actualizar el vecino" });
    }
    if(!vecino){
        return res.status(404).send({message:'No se encontro vecino'});
    }
    return res.status(200).send(vecino);
    });
};

const updateVecinoEstado = (req,res) =>{
    const {codigo} = req.params;
    Vecino.updateOne({codigo:codigo}, {estado:'inactivo',permiso:'inhabilitado'}, (error,vecino) =>{
        if(error){
            console.log(error)
            return res.status(400).send({message:"Error al elimiinar vecino"});
        }
        if(!vecino){
            return res.status(404).send({message:'No se encontro vecino'});
        }
        return res.status(200).send(vecino);
    });
}


const deleteVecino= (req, res) =>{
    const {codigo}= req.params;
    Vecino.findOneAndDelete({codigo},(error, vecino) =>{
        if(error){
            return res.status(400).send({message:'Error al eliminar vecino'});
        }
        if(!vecino){
            return res.status(404).send({message:'No se encontro vecino'});
        }
        return res.status(200).send(vecino);
    })
}

const getReservasVecino = (req, res) => {
    const { codigo } = req.params;
    Vecino.findOne({codigo}).populate({ path: 'reservas', populate: {path: 'servicio'} }).exec((error, vecino) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener las reservas' });
        }
        if(vecino.reservas.length === 0){
            return res.status(404).send({ message: "No se encontraron reservas"})
        }
        return res.status(200).send(vecino.reservas);
    })
}

const getMultasVecino = (req, res) => {
    const { codigo } = req.params;
    Vecino.findOne({codigo}).populate({ path: 'multas' }).exec((error, vecino) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener las multas' });
        }
        if(vecino.multas.length === 0){
            return res.status(404).send({ message: "No se encontraron multas"})
        }
        return res.status(200).send(vecino.multas);
    })
}

const getMensajesVecino = (req, res) => {
    const { codigo } = req.params;
    Vecino.findOne({codigo}).populate({ path: 'mensajes' , populate: {path: 'administrador vecino'}}).exec((error, vecino) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener los mensajes' });
        }
        if(vecino.mensajes.length === 0){
            return res.status(404).send({ message: "No se encontraron mensajes"})
        }
        return res.status(200).send(vecino.mensajes);
    })
}

const getCobrosVecino = (req, res) => {
    const { codigo } = req.params;
    Vecino.findOne({codigo}).populate({ path: 'cobros' }).exec((error, vecino) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener los cobros' });
        }
        if(vecino.cobros.length === 0){
            return res.status(404).send({ message: "No se encontraron cobros"})
        }
        return res.status(200).send(vecino.cobros);
    })
}



module.exports={
    createVecino,
    loginVecino,
    getVecinos,
    getVecino,
    getVecinoById,
    updateVecino,
    updateVecinoMen,
    updateVecinoEstado,
    deleteVecino,
    getReservasVecino,
    getMultasVecino,
    getMensajesVecino,
    getCobrosVecino
}