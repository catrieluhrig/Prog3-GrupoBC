import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import { autorizarRoles } from "../../middlewares/autorizarRoles.js";
import {
    buscarPacientePorId,
    asociarPacientesObrasSociales
} from "../../controllers/controllerPacientes.js";

const router = express.Router();

router.get("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    buscarPacientePorId
)

router.put("/:id_paciente/obras-sociales",
    [
        param("id_paciente")
            .isInt().withMessage("El id del paciente debe ser un numero entero"),
        body("id_obra_social")
            .isInt().withMessage("El id de la obra social debe ser un numero entero"),
        validar
    ],
    autorizarRoles([3]),
    asociarPacientesObrasSociales
)

export { router };