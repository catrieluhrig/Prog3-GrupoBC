import { pool } from "./conexion-sql.js";

export const turnoReserva = async (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total) => {
    const query = `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total) VALUES (?,?,?,?,?)`;
    const [rows] = await pool.execute(query, [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total ]); 
    if (rows.affectedRows == 0){
        return null
    }
    return rows
}

export const turnosDeUnMedico = async (id_usuario) => {
    const query = `SELECT tr.fecha_hora, tr.valor_total
                    FROM usuarios AS u
                    INNER JOIN medicos AS m ON m.id_usuario = u.id_usuario
                    INNER JOIN turnos_reservas AS tr ON tr.id_medico = m.id_medico
                    WHERE u.id_usuario = ?;`
    const [rows] = await pool.execute(query, [id_usuario])
    return rows
}

export const turnosDeUnPaciente = async (id_usuario) => {
    const query = `SELECT tr.fecha_hora, tr.valor_total
                    FROM usuarios as u
                    INNER JOIN pacientes AS p ON p.id_usuario = u.id_usuario
                    INNER JOIN turnos_reservas AS tr ON tr.id_paciente = p.id_paciente
                    WHERE u.id_usuario = ?`
    const [rows] = await pool.execute(query, [id_usuario])
    return rows
}

export const marcarComoAtendido = async (id_turno_reserva) => {
    const query = "UPDATE SET atentido = 1 WHERE id_turno_reserva ? AND activo = 1"
    const [rows] = await pool.execute(query, [id_turno_reserva])
    return rows
}