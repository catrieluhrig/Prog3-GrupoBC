import {
    fetchMedicos,
    fetchMedicoById,
    asociarObraSocial
} from "../database/medicos.js";

export const getAllMedicos = async() =>{
    const result = await fetchMedicos()
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