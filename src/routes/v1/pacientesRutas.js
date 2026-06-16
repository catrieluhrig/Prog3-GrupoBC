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

/**
 * @swagger
 * /api/v1/pacientes/{id}:
 *   get:
 *     summary: Obtiene un paciente por ID
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 */
router.get("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    autorizarRoles([3]),
    buscarPacientePorId
)

/**
 * @swagger
 * /api/v1/pacientes/{id_paciente}/obras-sociales:
 *   put:
 *     summary: Asociar obra social a un paciente
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_obra_social:
 *                 type: integer
 *             required:
 *               - id_obra_social
 *     responses:
 *       200:
 *         description: Obra social asociada
 */
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