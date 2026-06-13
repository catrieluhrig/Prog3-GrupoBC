import { pool } from "./conexion-sql.js";

export const fetchPacienteById = async(id) => {
    const query = "SELECT * FROM pacientes WHERE id_paciente = ?";
    const [rows] = await pool.execute(query, [id]);
    return rows;
}

export const asociarObraSocial = async(id_obra_social, id_paciente) => {
    const query = "UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?";
    const [result] = await pool.execute(query, [id_obra_social, id_paciente]);

    return result.affectedRows > 0;
}