import { pool } from "./conexion-sql.js";

export const fetchPacienteById = async(id) => {
    const query = "SELECT * FROM pacientes WHERE id_paciente = ?";
    const [rows] = await pool.execute(query, [id]);
    return rows;
}