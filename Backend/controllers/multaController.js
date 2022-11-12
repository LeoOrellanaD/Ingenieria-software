const Multa= require('../models/multa');

const createMulta = (req, res) => {
    const{valor, tipo, fecha, hora, vecino} = req.body;
    const newMulta = new Multa({valor, tipo, fecha, hora, vecino});

newMulta.save((error, multa) =>{
    if(error){
        return res.status(400).send({message: 'Error al crear multa'});
    }
    return res.status(201).send(multa);
})
}

const getMultas =  (req, res) => {
    Multa.find({}).populate({ path: 'vecino' }).exec((error, multas) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener las multas' });
        }
        if(multas.length === 0){
            return res.status(404).send({ message: "No se encontraron multas"})
        }
        return res.status(200).send(multas);
    })
}

const getMulta = (req, res) => {
    const { id } = req.params;
    Multa.findById.populate({ path: 'vecino'}).exec(id, (error, multa) => {
        if (error) {
            return res.status(400).send({ message: 'Error al obtener multa' });
        }
        if (!multa) {
            return res.status(404).send({ message: 'No se encontró multa' });
        }
        return res.status(200).send(multa);
    })
}

const deleteMulta =  (req, res) => {
    const { id } = req.params;
    Multa.findOneAndDelete(id, (error, multa) => {
        if (error) {
            return res.status(400).send({ message: 'Error al eliminar multa' });
        }
        if (!multa) {
            return res.status(404).send({ message: 'No se encontró multa' });
        }
        return res.status(200).send(multa);
    })
}



module.exports={
    createMulta,
    getMultas,
    getMulta,
   // updateMulta,
    deleteMulta
}