import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import { autorizarRoles } from "../../middlewares/autorizarRoles.js";
import {
    crearTurnos,
    buscarTurnos,
    atenderTurnos
} from "../../controllers/controllerTurnos.js";

const router = express.Router()

router.post( "/",
    [
        body("id_medico")
            .notEmpty().withMessage("El id_medico es obligatorio")
            .isNumeric().withMessage("El id_medico debe ser un valor numerico"),
        body("id_paciente")
            .notEmpty().withMessage("El id_paciente es obligatorio")
            .isNumeric().withMessage("El id_paciente debe ser un valor numerico"),
        body("fecha_hora")
            .notEmpty().withMessage("La fecha_hora es obligatoria")
    ],
    autorizarRoles([3]),
    crearTurnos
)

router.put( "/:id/atendido",
    [
        body("atendido")
            .notEmpty().withMessage("Debe indicar si el turno fue atendido")
            .isNumeric().withMessage("Debe indicar si el turno fue atendido con 1 o 0"),
    ],
    autorizarRoles([1]),
    atenderTurnos
)

router.get("/", autorizarRoles([1,2]), buscarTurnos)

export { router }