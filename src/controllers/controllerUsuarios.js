import { actualizarFotoPerfilUsuario } from "../services/serviceUsuarios.js";

export const actualizarFotoPerfil = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                status: false,
                msg: "Debe enviar un archivo de imagen"
            });
        }

        const idUsuario = Number(req.params.id_usuario);
        const fotoPath = req.file.filename;

        await actualizarFotoPerfilUsuario(idUsuario, fotoPath);

        return res.status(200).send({
            status: true,
            msg: "Foto de perfil actualizada correctamente",
            foto_path: fotoPath
        });
    } catch (error) {
        console.log("Error al actualizar la foto de perfil: ", error);
        return res.status(500).send({
            status: false,
            error: error.message
        });
    }
};
