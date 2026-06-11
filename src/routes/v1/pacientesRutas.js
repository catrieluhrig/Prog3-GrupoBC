import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import {
    buscarPacientePorId
} from "../../controllers/controllerPacientes.js";

const router = express.Router();

router.get("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    buscarPacientePorId
)

export { router };