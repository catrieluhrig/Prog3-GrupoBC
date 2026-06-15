import { pool } from "./conexion-sql.js";

export const fetchUsuarioById = async(id) => {
    const query = "SELECT * FROM usuarios WHERE activo = 1 AND id_usuario = ?";
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
}

export const fetchUsuario = async(email, password) => {
    const query = `SELECT u.id_usuario, CONCAT(u.nombres, ' ', u.apellido) as usuario, u.rol
                    FROM usuarios  AS u
                    WHERE u.email = ? 
                    AND u.contrasenia = SHA2(?, 256) 
                    AND u.activo = 1;`
    const [rows] = await pool.execute(query, [email, password]);
    return rows[0] || null;
}

export const actualizarFotoPerfilUsuarioDB = async (idUsuario, fotoPath) => {
    const query = "UPDATE usuarios SET foto_path = ? WHERE id_usuario = ? AND activo = 1";
    const [result] = await pool.execute(query, [fotoPath, idUsuario]);

    if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado o inactivo");
    }

    return result;
}