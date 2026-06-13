import {
    fetchPacienteById,
    asociarObraSocial
} from "../database/pacientes.js";

export const getPacienteById = async () => {
    const result = await fetchPacientesById();
    return result;
};

export const relacionarPacientesObrasSociales = async (id_obra_social, id_paciente) => {
    const result = await asociarObraSocial(id_obra_social, id_paciente);
    return result;
};