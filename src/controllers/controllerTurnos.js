import {
    insertTurno,
    getTurnos,
    marcarTurnoAtendido
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

export const atenderTurnos = async (req, res) => {
    try{
        const idTurnoReserva = Number(req.params.id)
        const usuario = req.user
        const atendido = req.body.atendido

        const resultado = await marcarTurnoAtendido(atendido, idTurnoReserva, usuario.id_usuario)

        if (resultado.affectedRows === 0) {
        return res.status(403).json({
            status: false,
            msg: "No tiene permisos sobre este turno"
        });
        }

        res.status(200).send({
            "status": true,
            "msg": "Turno atendido: ", resultado
        })
        
    }catch (error) {
        res.status(500).send({
            "status": false,
            "error": error.message
        })
    }
}