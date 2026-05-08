import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import {
    buscarEspecialidades,
    buscarEspecialidadPorId,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
} from "../../controllers/controllerEspecialidades.js";

const router = express.Router();

router.get('/', buscarEspecialidades);

router.get("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    buscarEspecialidadPorId)

router.post( "/",
    [
        body("nombre")
            .notEmpty().withMessage("El nombre es obligatorio")
            .isLength({max: 120}).withMessage("Máximo de 120 caracteres"),
            validar
    ],
    crearEspecialidad
)
router.put("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        body("nombre")
            .notEmpty().withMessage("El nombre es obligatorio")
            .isLength({max: 120}).withMessage("Máximo de 120 caracteres"),
            validar
    ],
     actualizarEspecialidad
)
router.delete("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    eliminarEspecialidad
)

export { router };