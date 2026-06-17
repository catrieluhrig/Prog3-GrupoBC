import {
    getPacienteById,
    relacionarPacientesObrasSociales
} from "../services/servicePacientes.js";

export const buscarPacientePorId = async (req, res) => {
    try {
        const id = req.params.id;
        const paciente = await getPacienteById(id);
        res.status(200).send({
            "status": true,
            "msg": paciente
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}

export const asociarPacientesObrasSociales = async (req, res) => {
    try {
        const id_obra_social = req.body.id_obra_social
        const id_paciente  = req.params.id_paciente
        const asociados = await relacionarPacientesObrasSociales(id_obra_social, id_paciente);

        if(!asociados){
            return res.status(400).send({
            "status": false,
            "error": "No se pudo realizar la asociación de obra social"
         });
        }

        res.status(201).send({
            "status": true,
            "msg": "Se realizó la asociación de obra social con éxito"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}