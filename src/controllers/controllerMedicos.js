import {
    getAllMedicos,
    getMedicoById,
    getMedicosByEspecialidad,
    relacionarConObraSocial,
    relacionarConEspecialidad
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

export const buscarMedicoPorId = async (req, res) => {
    try {
        const id = req.params.id
        const medicos = await getMedicoById(id);
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

export const buscarMedicosPorEspecialidad = async (req, res) => {
    try {
        const id_especialidad = req.params.id_especialidad || req.params.id;
        const medicos = await getMedicosByEspecialidad(id_especialidad);
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

export const asociarMedicosEspecialidades = async(req, res) => {
    try{
        const id_medico = req.params.id_medico
        const id_especialidad = req.body.id_especialidad
        const asociados = await relacionarConEspecialidad(id_medico, id_especialidad)

        if(!asociados){
            return res.status(400).send({
            "status": false,
            "error": "No se pudo realizar la asociación de especialidad"
         });
        }

        res.status(201).send({
            "status": true,
            "msg": "Se realizó la asociación de especialidad con éxito"
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}