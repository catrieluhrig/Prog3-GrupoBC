import express  from 'express';
import apicache from 'apicache';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import { autorizarRoles } from "../../middlewares/autorizarRoles.js";
import {
    buscarObrasSociales,
    buscarObraSocialPorId,
    crearObraSocial,
    actualizarObraSocial,
    eliminarObraSocial
} from "../../controllers/controllerObrasSociales.js";

const cache = apicache.middleware;

const router = express.Router();

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   get:
 *     summary: Obtiene todas las obras sociales
 *     tags:
 *       - Obras Sociales
 *     responses:
 *       200:
 *         description: Lista de obras sociales
 */
router.get('/', cache('5 minutes'), autorizarRoles([3]), buscarObrasSociales);

/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   get:
 *     summary: Obtiene una obra social por ID
 *     tags:
 *       - Obras Sociales
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obra social encontrada
 */
router.get("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    autorizarRoles([3]),
    buscarObraSocialPorId
)

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   post:
 *     summary: Crear obra social
 *     tags:
 *       - Obras Sociales
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Obra Social XYZ
 *               descripcion:
 *                 type: string
 *                 example: Descripción de la obra social
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 15.5
 *               es_particular:
 *                 type: boolean
 *                 example: false
 *             required:
 *               - nombre
 *               - descripcion
 *               - porcentaje_descuento
 *               - es_particular
 *     responses:
 *       201:
 *         description: Obra social creada
 */
router.post( "/",
    [
        body("nombre")
            .notEmpty().withMessage("El nombre es obligatorio")
            .isLength({max: 120}).withMessage("Máximo de 120 caracteres"),
        body("descripcion")
            .notEmpty().withMessage("La descripcion es obligatoria")
            .isLength({max: 120}).withMessage("Máximo de 120 caracteres"),
        body("porcentaje_descuento")
            .isNumeric().withMessage("El porcentaje de descuento debe ser un valor númerico")
            .notEmpty().withMessage("El porcentaje de descuento es obligatoria"),
        body("es_particular")
            .notEmpty().withMessage("El atributo es_particular es obligatorio"),
        validar,
    ],
    autorizarRoles([3]),
    crearObraSocial
)

/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   put:
 *     summary: Actualizar obra social
 *     tags:
 *       - Obras Sociales
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
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               porcentaje_descuento:
 *                 type: number
 *               es_particular:
 *                 type: boolean
 *             required:
 *               - nombre
 *               - descripcion
 *               - porcentaje_descuento
 *               - es_particular
 *     responses:
 *       200:
 *         description: Obra social actualizada
 */
router.put("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        body("nombre")
            .optional()
            .notEmpty().withMessage("El nombre es obligatorio")
            .isLength({max: 120}).withMessage("Máximo de 120 caracteres"),
        body("descripcion")
            .optional()
            .notEmpty().withMessage("La descripcion es obligatoria")
            .isLength({max: 120}).withMessage("Máximo de 120 caracteres"),
        body("porcentaje_descuento")
            .optional()
            .isNumeric().withMessage("El porcentaje de descuento debe ser un valor númerico"),
        body("es_particular")
            .optional()
            .isInt().withMessage("El atributo es_particular debe ser un entero"),
        validar,
    ],
    autorizarRoles([3]),
    actualizarObraSocial
)

/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   delete:
 *     summary: Eliminar obra social
 *     tags:
 *       - Obras Sociales
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obra social eliminada
 */
router.delete("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    autorizarRoles([3]),
    eliminarObraSocial
)

export { router };