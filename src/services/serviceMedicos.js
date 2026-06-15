import {
    fetchMedicos,
    fetchMedicoById,
    fetchMedicosByEspecialidad,
    asociarObraSocial,
    asociarEspecialidad
} from "../database/medicos.js";

export const getAllMedicos = async() =>{
    const result = await fetchMedicos()
    return result;
}

export const getMedicosByEspecialidad = async(id_especialidad) => {
    const result = await fetchMedicosByEspecialidad(id_especialidad);
    return result;
}

export const getMedicoById = async(id) =>{
    const result = await fetchMedicoById(id)
    return result;
}

export const relacionarConObraSocial = async(id, obrasSociales) =>{
    const result = await asociarObraSocial(id, obrasSociales)
    return result;
}

export const relacionarConEspecialidad = async(id_medico, id_especialidad) => {
    const result = await asociarEspecialidad(id_medico, id_especialidad)
    return result;
}