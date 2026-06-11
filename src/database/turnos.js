import { pool } from "./conexion-sql.js";

export const turnoReserva = async (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total) => {
    const query = `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total) VALUES (?,?,?,?,?)`;
    const [result] = await pool.execute(query, [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total ]); 
    //if (result.affectedRows == 0){
    //    return null
    //}
    return result
}