import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import {
    autenticar
} from "../../controllers/controllerAutenticacion.js";

const router = express.Router();

router.post("/login", [
        body('email')
            .notEmpty().withMessage('El email es obligatorio')
            .isEmail().withMessage('El formato del email es incorrecto'),
        body('password')
            .notEmpty().withMessage('La contraseña es obligatoria'),
        validar
    ], 
    autenticar
)

export { router }