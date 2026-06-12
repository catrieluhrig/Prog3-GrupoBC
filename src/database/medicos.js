import { pool } from "./conexion-sql.js";

export const fetchMedicos = async() => {
    const [rows] = await pool.execute(`
        SELECT *
        FROM v_medicos
    `);
    return rows;
}

export const fetchMedicoById = async (id) => {
    const query = `SELECT * FROM medicos WHERE id_medico = ?`
    const [rows] = await pool.execute(query, [id])
    return rows
}

export const fetchMedicosByEspecialidad = async (id_especialidad) => {
    const query = `SELECT m.id_medico,
                    CONCAT(u.nombres, ' ', u.apellido) AS medico
                    FROM medicos AS m
                    INNER JOIN usuarios AS u
                    ON u.id_usuario = m.id_usuario
                    WHERE m.id_especialidad = ?;`
    const [rows] = await pool.execute(query, [id_especialidad]);
    return rows;
}

export const asociarObraSocial = async(id, obrasSociales) => {
    const conexion = await pool.getConnection();
    try{
            await conexion.beginTransaction();
            for(const obra of obrasSociales){
                const query = `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?,?);`
                await conexion.execute(sql, [id, obra.id_obra_social]);
            }   

            await conexion.commit();
            await conexion.release();

            return true;
        }
        catch(error) {
            await conexion.rollback();
            await conexion.release();
            return false;
        }

}