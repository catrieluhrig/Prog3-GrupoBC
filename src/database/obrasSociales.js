import { pool } from "./conexion-sql.js";

export const fetchObrasSociales = async() => {
    const [rows] = await pool.execute(`
        SELECT *
        FROM obras_sociales
        WHERE activo = 1
    `);

    return rows;
}

export const fetchObraSocialById = async(id) => {
    const query = "SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?";
    const [rows] = await pool.execute(query, [id]);
    return rows;
}

export const insertObraSocial = async(nombre) => {
    const query = "INSERT INTO obras_sociales (nombre) VALUES (?)";
    const [result] = await pool.execute(query, [nombre]);
    return result;
}

export const updateObraSocialById = async(id, obraSocial) => {
    const allowed = ['nombre', 'descripcion', 'porcentaje_descuento', 'es_particular']
    const fields = [] //Acá van las claves (nombre, descripcion, etc)
    const values = [] //Acá van los valores de las claves

    allowed.forEach((key) => {
        if (obraSocial[key] !== undefined) {
        fields.push(`${key} = ?`)
        values.push(obraSocial[key])
        }
    })

    if (!fields.length) return null

    const query = `UPDATE obras_sociales SET ${fields.join(', ')} WHERE id_obra_social = ?`
    values.push(id)

    const [result] = await pool.execute(query, values)
    return result
}