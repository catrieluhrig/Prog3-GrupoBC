import {
    fetchPacienteById
} from "../database/pacientes.js";

export const getPacienteById = async () => {
    const result = await fetchPacientesById();
    return result;
};