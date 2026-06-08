import {
    getAllMedicos,
    relacionarConObraSocial
} from "../services/serviceMedicos.js";

export const buscarMedicos = async (req, res) => {
    try {
        const medicos = await getAllMedicos();
        res.status(200).send({
            "status": true,
            "msg": medicos
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}

export const asociarMedicosObrasSociales = async (req, res) => {
    try {
        const obrasSociales = req.body.obras_sociales;
        const { id } = req.params
        const asociados = await relacionarConObraSocial(id, obrasSociales);

        if(!asociados){
            return res.status(400).send({
            "status": false,
            "error": "No se pudo realizar la asociación"
         });
        }

        res.status(201).send({
            "status": true,
            "msg": "Se realizó la asociación con éxito"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}