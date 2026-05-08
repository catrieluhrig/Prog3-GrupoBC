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
    return result;
};

export const deleteEspecialidad = async (id) => {
    const result = await deleteEspecialidadById(id);
    return result;
};