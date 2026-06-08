import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import {
    buscarMedicos,
    asociarMedicosObrasSociales
} from "../../controllers/controllerMedicos.js";

const router = express.Router();

router.get('/', buscarMedicos);

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

export { router };