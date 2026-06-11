import {
    getPacienteById
} from "../services/servicePacientes.js";

export const buscarPacientePorId = async (req, res) => {
    try {
        const paciente = await getPacienteById();
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