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

const getServicio = (req, res) => {
    const {id} = req.params
    Servicio.findById(id, (error, servicio) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(!servicio){
            return res.status(404).send({ message: "No se ha encontrado el servicio"})
        }
        return res.status(200).send(servicio)
    })
}

const getServicios = (req , res) => {
    Servicio.find({},(error, servicios) =>{
        if(error){
            return res.status(400).send({message:'Error al obtener los servicios'});
        }
        if(servicios.length === 0){
            return res.status(404).send({ message: "No se encontraron servicios"})
        }
        return res.status(200).send(servicios);
    })
}

const updateServicio = (req, res) => {
    const {costo} = req.body;
    const {nombre} = req.params;
    Servicio.findOneAndUpdate({nombre}, { nombre, costo }, (error, servicio) => {
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
    const { nombre } = req.params;
    Servicio.findOneAndDelete({nombre}, (error, servicio) => {
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
    getServicio,
    getServicios,
    updateServicio,
    deleteServicio
}