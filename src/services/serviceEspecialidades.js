import {
    fetchEspecialidades,
    fetchEspecialidadById,
    insertEspecialidad,
    updateEspecialidadById,
    deleteEspecialidadById
} from "../database/especialidades.js";

export const getAllEspecialidades = async () => {
    const result = await fetchEspecialidades();
    return result;
};

export const getEspecialidadById = async (id) => {
    const result = await fetchEspecialidadById(id);
    return result;
};

export const createEspecialidad = async (nombre) => {
    const result = await insertEspecialidad(nombre);
    return result;
};

export const updateEspecialidad = async (id, nombre) => {
    const result = await updateEspecialidadById(id, nombre);
    const especialidadActiva = await getEspecialidadById(id)
    if(especialidadActiva.length === 0){
        return null;
    }
    return result;
};

export const deleteEspecialidad = async (id) => {
    const result = await deleteEspecialidadById(id);
    const especialidadActiva = await getEspecialidadById(id)
    if(especialidadActiva.length === 0){
        return null;
    }
    return result;
};