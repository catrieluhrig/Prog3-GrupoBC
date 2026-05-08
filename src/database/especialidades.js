import { pool } from "./conexion-sql.js";
    
export const fetchEspecialidades = async() => {
    const [rows] = await pool.query(`
        SELECT *
        FROM especialidades
        WHERE activo = 1
    `);

    return rows;
}

export const fetchEspecialidadById = async(id) => {
    const query = "SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?";
    const [rows] = await pool.execute(query, [id]);
    return rows;
}

export const insertEspecialidad = async(nombre) => {
    const query = "INSERT INTO especialidades (nombre) VALUES (?)";
    const [result] = await pool.execute(query, [nombre]);
    return result;
}

export const updateEspecialidadById = async(id, nombre) => {
    const query = "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?";
    const [result] = await pool.execute(query, [nombre, id]);
    return result;
}

export const deleteEspecialidadById = async(id) => {
    const query = "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?";
    const [result] = await pool.execute(query, [id]);
    return result;
}