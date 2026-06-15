import { turnoReserva } from "../database/turnos.js";
import { turnosDeUnMedico } from "../database/turnos.js";
import { turnosDeUnPaciente } from "../database/turnos.js";
import { marcarComoAtendido } from "../database/turnos.js";
import { fetchMedicoById } from "../database/medicos.js";
import { fetchPacienteById } from "../database/pacientes.js";
import { fetchObraSocialById } from "../database/obrasSociales.js";

export const insertTurno = async (data) => {
    const medico = await fetchMedicoById(data.id_medico)
    const paciente = await fetchPacienteById(data.id_paciente)
    const obraSocial = await fetchObraSocialById(paciente[0].id_obra_social)

    let valorConsulta = medico[0].valor_consulta
    const porcentajeDescuento = obraSocial[0].porcentaje_descuento

    if(obraSocial[0].es_particular === 0){
        valorConsulta = valorConsulta - (porcentajeDescuento * valorConsulta)
        //Los registros de porcentaje_descuento de la base de datos fueron cambiados para esta formula a valores como 0.10 en vez de 10.00
        //La formula si el porcentaje_descuento fuera 10 sería: valorConsulta * (1 - porcentaje_descuento / 100)
    }

    console.log(medico[0].id_medico, paciente[0].id_paciente, obraSocial[0].id_obra_social, data.fecha_hora, valorConsulta)
    const result = await turnoReserva(medico[0].id_medico, paciente[0].id_paciente, obraSocial[0].id_obra_social, data.fecha_hora, valorConsulta);
    return result;
};

export const getTurnos = async(usuario) => {
    //Rol 1 es médico
    if(usuario.rol === 1){
        return turnosDeUnMedico(usuario.id_usuario)
    //Rol 2 es paciente
    }else{
        return turnosDeUnPaciente(usuario.id_usuario)
    }
}

export const marcarTurnoAtendido = async(atendido, id_turno_reserva, id_usuario) => {
    return marcarComoAtendido(atendido, id_turno_reserva, id_usuario)
}