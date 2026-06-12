import {
    insertTurno,
    getTurnos
} from "../services/serviceTurnos.js";

export const crearTurnos = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const turno = await insertTurno(data);
        res.status(201).send({
            "status": true,
            "msg": "Turno creado correctamente: ", turno
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}

export const buscarTurnos = async (req, res) => {
    try{
        const usuario = req.user
        const turnos = await getTurnos(usuario)
        res.status(200).send({
            "status": true,
            "msg": turnos
        })
    }catch (error) {
        res.status(500).send({
            "status": false,
            "error": error.message
        })
    }
}