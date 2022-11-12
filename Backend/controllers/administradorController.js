const Administrador = require('../models/administrador');

const updateAdministrador = (req, res) => {
    
}


const loginAdministrador = (req, res) => {
    const {codigo} =req.body;
    Administrador.findOne({codigo}, (error, administrador) => {
        if(error){
            return res.status(400).send({message: 'Error al inciar sesion'})
        }
        if(!administrador){
            return res.status(400).send({message: 'No se encontro administrador'})
        }
        return res.status(200).send(administrador);
    })
}