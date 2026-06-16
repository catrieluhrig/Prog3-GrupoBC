import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import { autorizarRoles } from "../../middlewares/autorizarRoles.js";
import {
    buscarEspecialidades,
    buscarEspecialidadPorId,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
} from "../../controllers/controllerEspecialidades.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/especialidades:
 *   get:
 *     summary: Obtiene todas las especialidades
 *     tags:
 *       - Especialidades
 *     responses:
 *       200:
 *         description: Lista de especialidades
 */
router.get('/', autorizarRoles([2,3]), buscarEspecialidades);


/**
 * @swagger
 * /api/v1/especialidades/{id}:
 *   get:
 *     summary: Obtiene una especialidad por ID
 *     tags:
 *       - Especialidades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad encontrada
 */
router.get("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    autorizarRoles([2,3]),
    buscarEspecialidadPorId)

/**
 * @swagger
 * /api/v1/especialidades:
 *   post:
 *     summary: Crear especialidad
 *     tags:
 *       - Especialidades
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Cardiología
 *     responses:
 *       201:
 *         description: Especialidad creada
 */
router.post( "/",
    [
        body("nombre")
            .notEmpty().withMessage("El nombre es obligatorio")
            .isLength({max: 120}).withMessage("Máximo de 120 caracteres"),
            validar
    ],
    autorizarRoles([3]),
    crearEspecialidad
)

/**
 * @swagger
 * /api/v1/especialidades/{id}:
 *   put:
 *     summary: Actualizar especialidad
 *     tags:
 *       - Especialidades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Cardiología
 *             required:
 *               - nombre
 *     responses:
 *       200:
 *         description: Especialidad actualizada
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Especialidad no encontrada
 */
router.put("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        body("nombre")
            .notEmpty().withMessage("El nombre es obligatorio")
            .isLength({max: 120}).withMessage("Máximo de 120 caracteres"),
            validar
    ],
    autorizarRoles([3]),
    actualizarEspecialidad
)

/**
 * @swagger
 * /api/v1/especialidades/{id}:
 *   delete:
 *     summary: Eliminar especialidad
 *     tags:
 *       - Especialidades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad a eliminar
 *     responses:
 *       200:
 *         description: Especialidad eliminada
 *       404:
 *         description: Especialidad no encontrada
 */
router.delete("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    autorizarRoles([3]),
    eliminarEspecialidad
)

export { router };