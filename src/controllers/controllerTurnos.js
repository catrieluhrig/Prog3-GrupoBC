import {
    insertTurno
} from "../services/serviceTurnos.js";

export const crearTurnos = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const turno = await insertTurno(data);
        res.status(201).send({
            "status": true,
            "msg": turno
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "error": error.message
         });
    }
}