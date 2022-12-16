const Vecino = require('../models/vecino');


const createVecino = (req, res)=>{
    const{nombre, apellido, rut, vivienda, horas, permiso ,codigo} = req.body;
    const newVecino= new Vecino(
        {
            nombre,
            apellido,
            rut,
            vivienda,
            horas,
            permiso,
            codigo
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

const updateVecino = (req, res) =>{
    const {nombre, apellido, rut, vivienda, permiso, horas} = req.body;
    const {codigo} = req.params;
    Vecino.findOneAndUpdate({codigo}, {nombre, apellido, rut, vivienda, permiso, horas}, (error, vecino) =>{
        if(error){
            return res.status(400).send({message: 'Error al actualizar vecino'});
        }
        if(!vecino){
            return res.status(404).send({message:'No se encontro vecino'});
        }
        return res.status(200).send(vecino);
    })
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



module.exports={
    createVecino,
    loginVecino,
    getVecinos,
    getVecino,
    updateVecino,
    deleteVecino
}