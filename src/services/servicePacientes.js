import {
    fetchPacienteById,
    asociarObraSocial
} from "../database/pacientes.js";

export const getPacienteById = async (id) => {
    const result = await fetchPacienteById(id);
    return result;
};

export const relacionarPacientesObrasSociales = async (id_obra_social, id_paciente) => {
    const result = await asociarObraSocial(id_obra_social, id_paciente);
    return result;
};