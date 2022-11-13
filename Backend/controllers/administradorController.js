const Administrador = require('../models/administrador');

const createAdministrador = (req, res)=>{
    const {nombre, apellido, rut, telefono, codigo} = req.body;
    const newAdministrador = new Administrador(
        {
            nombre,
            apellido,
            rut,
            telefono,
            codigo
        });
    newAdministrador.save((error, administrador) => {
        if(error){
            return res.status(400).send({message: 'Error al crear administrador'});
        }
        return res.status(201).send(administrador);
    })
}

const updateAdministrador = (req, res) => {
    const {nombre, apellido, rut, telefono, codigo} = req.body;
    const {id} = req.params;
    Administrador.findByIdAndUpdate(id, {nombre, apellido, rut, telefono, codigo}, (error, administrador) =>
    {
        if(error){
            return res.status(400).send({message: 'Error al actualizar administrador'});
        }
        if(!administrador)
        {
            return res.status(404).send({message: 'No se encontro administrador'});
        }
        return res.status(200).send(administrador);
    })
}

const loginAdministrador = (req, res) => {
    const {codigo} =req.body;
    Administrador.findOne({codigo}, (error, administrador) => {
        if(error){
            return res.status(400).send({message: 'Error al inciar sesion'})
        }
        if(!administrador){
            return res.status(404).send({message: 'No se encontro administrador'})
        }
        return res.status(200).send(administrador);
    })
}

const deleteAdministrador = (req, res) =>{
    const {id}= req.params;
    Administrador.findByIdAndDelete(id,(error, administrador) => {
        if(error){
            return res.status(400).send({message: 'Error al eliminar administrador'})
        }
        if(!administrador){
            return res.status(404).send({message: 'No se encontro administrador'})
        }
        return res.status(200).send(administrador);
    })
}

const getAdministradores = (req, res) => {
    Administrador.find({}, (error, administradores) => {
        if(error){
            return res.status(400).send({ message: "No se ha podido realizar la busqueda"})
        }
        if(administradores.length === 0){
            return res.status(404).send({ message: "No se encontraron administradores"})
        }
        return res.status(200).send(administradores)
    })
}

module.exports ={
    createAdministrador,
    updateAdministrador,
    loginAdministrador,
    deleteAdministrador,
    getAdministradores
}