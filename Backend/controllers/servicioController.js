const Servicio = require('../models/servicio');

const createServicio = (req, res) => {
    const {nombre, costo} = req.body;
    const newServicio = new Servicio({nombre, costo});
    newServicio.save((error, servicio) => {
    if(error){
        return res.status(400).send({message:'Error al crear el servicio'});
    }
    return res.status(201).send(servicio);
})
}

const getServicios = (req , res) => {
    Servicio.find({},(error, servicios) =>{
        if(error){
            return res.status(400).send({message:'Error al obtener los servicios'});
        }
        return res.status(200).send(servicios);
    })
}

const getServicio =(req, res) => {
    const {id} =req.params;
    Servicio.findById(id, (error, servicio) => {
        if(error){
            return res.status(400).send({message:'Error al obtener servicio'});
        }
        if(!servicio){
            return res.status(400).send({message:'No se encontro el servicio'});
        }
        return res.status(200).send(servicio);
    })
}

const updateServicio = (req, res) => {
    const { nombre, costo} = req.body;
    const { id } = req.params;
    Servicio.findOneAndUpdate(id, { nombre, costo }, (error, servicio) => {
        if (error) {
            return res.status(400).send({ message: 'Error al actualizar el servicio' });
        }
        if (!servicio) {
            return res.status(404).send({ message: 'No se encontró el servicio' });
        }
        return res.status(200).send(servicio);
    })
}

const deleteServicio = (req, res) => {
    const { id } = req.params;
    Servicio.findOneAndDelete(id, (error, servicio) => {
        if (error) {
            return res.status(400).send({ message: 'Error al eliminar el servicio' });
        }
        if (!servicio) {
            return res.status(404).send({ message: 'No se encontró el servicio' });
        }
        return res.status(200).send(servicio);
    })
}

module.exports={
    createServicio,
    getServicios,
    getServicio,
    updateServicio,
    deleteServicio
}