import {
    fetchMedicos,
    asociarObraSocial
} from "../database/medicos.js";

export const getAllMedicos = async() =>{
    const result = await fetchMedicos()
    return result;
}

export const relacionarConObraSocial = async(id, obrasSociales) =>{
    const result = await asociarObraSocial(id, obrasSociales)
    return result;
}