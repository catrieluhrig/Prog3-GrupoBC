import { turnoReserva } from "../database/turnos.js";
import { fetchMedicoById } from "../database/medicos.js";
import { fetchPacienteById } from "../database/pacientes.js";
import { fetchObraSocialById } from "../database/obrasSociales.js";

export const insertTurno = async (data) => {
    const medico = await fetchMedicoById(data.id_medico)
    const paciente = await fetchPacienteById(data.id_paciente)
    const obraSocial = await fetchObraSocialById(paciente[0].id_obra_social)

    const valorConsulta = medico[0].valor_consulta
    const porcentajeDescuento = obraSocial.porcentaje_descuento

    if(obraSocial.es_particular === 0){
        const valorConsulta = valorConsulta - (porcentajeDescuento/100 * valorConsulta)
    }

    turnoReserva.valor_total = valorConsulta
    console.log(medico[0].id_medico, paciente[0].id_paciente, obraSocial[0].id_obra_social, data.fecha_hora, valorConsulta)
    const result = await turnoReserva(medico[0].id_medico, paciente[0].id_paciente, obraSocial[0].id_obra_social, data.fecha_hora, valorConsulta);
    return result;
};