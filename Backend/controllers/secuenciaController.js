const Secuencia =require('../models/secuencia')

const CreateSecuencia = (req,res)=>{
 const{nombre,valor}=req.body;
 const newSecuencia = new Secuencia({
    nombre,
    valor
 });
 newSecuencia.save((error,secuencia) => {
    if(error){
        return res.status(400).send({message:'Error al crear secuencia'})
    }
    return res.status(201).send(secuencia);
 })
}

module.exports={
    CreateSecuencia
}