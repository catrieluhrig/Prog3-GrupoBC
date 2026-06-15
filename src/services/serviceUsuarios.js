import {
    fetchUsuario,
    fetchUsuarioById,
    actualizarFotoPerfilUsuarioDB
} from "../database/usuarios.js";

export const getUsuario = async (email, password) => {
    const result = await fetchUsuario(email,password);
    return result;
};

export const getUsuarioById = async (id) => {
    const result = await fetchUsuarioById(id);
    return result;
};

export const actualizarFotoPerfilUsuario = async (idUsuario, fotoPath) => {
    return await actualizarFotoPerfilUsuarioDB(idUsuario, fotoPath);
};