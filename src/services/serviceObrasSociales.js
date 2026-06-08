import {
    fetchObrasSociales,
    fetchObraSocialById,
    insertObraSocial,
    updateObraSocialById,
    deleteObraSocialById
} from "../database/obrasSociales.js";

export const getAllObrasSociales = async () => {
    const result = await fetchObrasSociales();
    return result;
};

export const getObraSocialById = async (id) => {
    const result = await fetchObraSocialById(id);
    return result;
};

export const createObraSocial = async (nombre) => {
    const result = await insertObraSocial(nombre);
    return result;
};

export const updateObraSocial = async (id, obraSocial) => {
    const result = await updateObraSocialById(id, obraSocial);
    const obraSocialActiva = await getObraSocialById(id)
    if(obraSocialActiva.length === 0){
        return null;
    }
    return result;
};

export const deleteObraSocial = async (id) => {
    const result = await deleteObraSocialById(id);
    const obraSocialActiva = await getObraSocialById(id)
    if(obraSocialActiva.length === 0){
        return null;
    }
    return result;
};