import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import {
    autenticar
} from "../../controllers/controllerAutenticacion.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Autenticación de usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Credenciales inválidas
 */
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