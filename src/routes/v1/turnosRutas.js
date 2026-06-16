import express  from 'express';
import apicache from 'apicache';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import { autorizarRoles } from "../../middlewares/autorizarRoles.js";
import {
    crearTurnos,
    buscarTurnos,
    atenderTurnos
} from "../../controllers/controllerTurnos.js";

const cache = apicache.middleware;

const router = express.Router()

/**
 * @swagger
 * /api/v1/turnos-reservas:
 *   post:
 *     summary: Crear turno/reserva
 *     tags:
 *       - Turnos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_medico:
 *                 type: integer
 *               id_paciente:
 *                 type: integer
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - id_medico
 *               - id_paciente
 *               - fecha_hora
 *     responses:
 *       201:
 *         description: Turno creado
 */
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
    autorizarRoles([3]),
    crearTurnos
)

/**
 * @swagger
 * /api/v1/turnos-reservas/{id}/atendido:
 *   put:
 *     summary: Marcar turno como atendido
 *     tags:
 *       - Turnos
 *     parameters:
 *       - in: path
 *         name: id
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
 *               atendido:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - atendido
 *     responses:
 *       200:
 *         description: Turno actualizado
 */
router.put( "/:id/atendido",
    [
        body("atendido")
            .notEmpty().withMessage("Debe indicar si el turno fue atendido")
            .isNumeric().withMessage("Debe indicar si el turno fue atendido con 1 o 0"),
    ],
    autorizarRoles([1]),
    atenderTurnos
)

/**
 * @swagger
 * /api/v1/turnos-reservas:
 *   get:
 *     summary: Obtiene todos los turnos
 *     tags:
 *       - Turnos
 *     responses:
 *       200:
 *         description: Lista de turnos
 */
router.get("/", autorizarRoles([1,2]), cache('5 minutes'), buscarTurnos)

export { router }