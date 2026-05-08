import {
    getAllEspecialidades,
    getEspecialidadById,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad
} from "../services/serviceEspecialidades.js";

export const buscarEspecialidades = async (req, res) => {
    try {
        const especialidades = await getAllEspecialidades();
        res.status(200).send({
            "status": "HTTP 200 OK",
            "msg": especialidades
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": error.message });
    }
}

export const buscarEspecialidadPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const especialidades = await getEspecialidadById(id);
        
        if (especialidades.length === 0) {
            return res.status(404).send({
                "status": "HTTP 404",
                "msg": "Especialidad no encontrada"
            });
        }
        
        res.status(200).send({
            "status": "HTTP 200 OK",
            "msg": especialidades
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": error.message });
    }
}

export const crearEspecialidad = async (req, res) => {
    try{
        const { nombre } = req.body;
        /*const query = "INSERT INTO especialidades (nombre) VALUES (?)";
        const [result] = await pool.execute(query, [nombre]); //El segundo parametro de execute() debe ser un array*/
        const result = await createEspecialidad(nombre)
        res.status(201).send({
            "status": "HTTP 201",
            "msg": "Especialidad insertada correctamente"
        })
    } 
    catch(error){
        console.log("Error de red al insertar especialidad: ", error);
        res.status(500).send({ "error": error.message });
    }
} 

export const actualizarEspecialidad = async (req, res) => {
    try{
        const { nombre } = req.body;
        const id = req.params.id;
        const especialidadActiva = await getEspecialidadById(id)
        if(especialidadActiva.length === 0){
            return res.status(404).send({
                "status": "HTTP 404",
                "msg": "Especialidad no encontrada"
            })
        }
        const result = await updateEspecialidad(id, nombre)
        res.status(200).send({
            "status": "HTTP 200",
            "msg": "Especialidad actualizada correctamente"
        })
    }
    catch(error){
        console.log("Error al actualizar especialidad: ", error);
        res.status(500).send({ "error": error.message });
    }
}

export const eliminarEspecialidad = async(req, res) => {
    try{
        const id = req.params.id
        const especialidadActiva = await getEspecialidadById(id)
        if(especialidadActiva.length === 0){
            return res.status(404).send({
                "status": "HTTP 404",
                "msg": "Especialidad no encontrada"
            })
        }
        const result = await deleteEspecialidad(id)
        res.status(200).send({
            "status": "HTTP 200",
            "msg": "Especialidad removida correctamente"
        })
    }catch(error){
        console.log("Error al eliminar especialidad: ", error);
        res.status(500).send({ "error": error.message });
    }
}