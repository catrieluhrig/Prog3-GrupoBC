import express  from 'express';
import { body } from "express-validator";
import { validar } from "../middlewares/middleware.js";

import {
    buscarEspecialidades,
    buscarEspecialidadPorId,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
} from "../controllers/controllerEspecialidades.js";

const router = express.Router();

router.get('/', buscarEspecialidades);
router.get("/:id", buscarEspecialidadPorId)
router.post( "/",
    [
        body("nombre")
            .notEmpty()
            .withMessage("El nombre es obligatorio"),

        validar
    ],
    crearEspecialidad
)
router.put("/:id", actualizarEspecialidad)
router.delete("/:id", eliminarEspecialidad)

export { router };