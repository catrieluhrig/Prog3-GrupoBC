import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import { autorizarRoles } from "../../middlewares/autorizarRoles.js";
import {
    buscarMedicos,
    buscarMedicoPorId,
    buscarMedicosPorEspecialidad,
    asociarMedicosObrasSociales,
    asociarMedicosEspecialidades
} from "../../controllers/controllerMedicos.js";

const router = express.Router();

router.get('/', autorizarRoles([2]), buscarMedicos);

router.get('/:id', [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    autorizarRoles([2]),
    buscarMedicoPorId
);

router.get('/especialidades/:id_especialidad', [
        param("id_especialidad")
            .isInt().withMessage("El id_especialidad debe ser un numero entero"),
        validar
    ],
    autorizarRoles([2]),
    buscarMedicosPorEspecialidad
);

router.post("/:id/obras-sociales",
     [
        param("id")
            .notEmpty().withMessage("El id del médico es obligatorio")
            .isInt().withMessage("El id debe ser un numero entero"),
        body("obras_sociales")
            .isArray({ min: 1 }).withMessage("Las obras sociales son obligatorias y deben ser un array"),
        body("obras_sociales.*.id_obra_social")
            .isInt().withMessage("Cada obra social debe tener id_obra_social numérico"),
        validar

    ], asociarMedicosObrasSociales
)

router.put("/:id_medico/especialidades",
     [
        param("id_medico")
            .notEmpty().withMessage("El id del médico es obligatorio")
            .isInt().withMessage("El id debe ser un numero entero"),
        body("id_especialidad")
            .notEmpty().withMessage("El id de especialidad es obligatorio")
            .isInt().withMessage("El id de especialidad debe ser un valor numerico"),
        validar

    ],
    autorizarRoles([3]),
    asociarMedicosEspecialidades)

export { router };