import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import {
    crearTurnos
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
    crearTurnos
)

export { router }