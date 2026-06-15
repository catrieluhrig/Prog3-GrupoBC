import { pool } from "./conexion-sql.js";

export const obtenerEstadisticas = async() => {
    const query = "CALL sp_reporte_estadisticas()";
    const result = await pool.execute(query);
    return result
}