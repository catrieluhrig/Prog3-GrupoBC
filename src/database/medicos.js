import { pool } from "./conexion-sql.js";

export const fetchMedicos = async() => {
    const [rows] = await pool.execute(`
        SELECT *
        FROM v_medicos
    `);

    return rows;
}

export const asociarObraSocial = async() => {
    const [rows] = await pool.execute(`
        
    `);

    return rows;
}