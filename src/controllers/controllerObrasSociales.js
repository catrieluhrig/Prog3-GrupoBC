import {
    getAllObrasSociales,
    getObraSocialById,
    createObraSocial,
    updateObraSocial,
    deleteObraSocial
} from "../services/serviceObrasSociales.js";

export const buscarObrasSociales = async (req, res) => {
    try {
        const obrasSociales = await getAllObrasSociales();
        res.status(200).send({
            "status": true,
            "msg": obrasSociales
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}

export const buscarObraSocialPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const obrasSociales = await getObraSocialById(id);
        
        if (obrasSociales.length === 0) {
            return res.status(404).send({
                "status": false,
                "msg": "Obra social no encontrada"
            });
        }
        
        res.status(200).send({
            "status": true,
            "msg": obrasSociales
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}

export const crearObraSocial = async (req, res) => {
    try{
        const { nombre } = req.body;
        const result = await createObraSocial(nombre)
        res.status(201).send({
            "status": true,
            "msg": "Obra social insertada correctamente"
        })
    } 
    catch(error){
        console.log("Error de red al insertar obra social: ", error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
} 

export const actualizarObraSocial = async (req, res) => {
    try{
        const obraSocial = req.body;
        const id = req.params.id;
        const result = await updateObraSocial(id, obraSocial)

        if (!result || result.affectedRows === 0) {
            return res.status(404).send({
                "status": false,
                "msg": "Obra social no encontrada o no se actualizó"
            });
        }

        res.status(200).send({
            "status": true,
            "msg": "Obra social actualizada correctamente"
        })
    }
    catch(error){
        console.log("Error al actualizar obra social: ", error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}

export const eliminarObraSocial = async(req, res) => {
    try{
        const id = req.params.id
        const result = await deleteObraSocial(id)
        res.status(200).send({
            "status": true,
            "msg": "Obra social removida correctamente"
        })
    }catch(error){
        console.log("Error al eliminar obra social: ", error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}