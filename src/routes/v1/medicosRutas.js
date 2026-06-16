import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import { autorizarRoles } from "../../middlewares/autorizarRoles.js";
import {
    buscarMedicos,
    buscarMedicoPorId,
    buscarMedicosPorEspecialidad,
    asociarMedicosObrasSociales,
    asociarMedicosEspecialidades
} from "../../controllers/controllerMedicos.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/medicos:
 *   get:
 *     summary: Obtiene todos los médicos
 *     tags:
 *       - Médicos
 *     responses:
 *       200:
 *         description: Lista de médicos
 */
router.get('/', autorizarRoles([2]), buscarMedicos);

/**
 * @swagger
 * /api/v1/medicos/{id}:
 *   get:
 *     summary: Obtiene un médico por ID
 *     tags:
 *       - Médicos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 */
router.get('/:id', [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    autorizarRoles([2]),
    buscarMedicoPorId
);

/**
 * @swagger
 * /api/v1/medicos/especialidades/{id_especialidad}:
 *   get:
 *     summary: Obtiene médicos por especialidad
 *     tags:
 *       - Médicos
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 * 
*/
router.get('/especialidades/:id_especialidad', [
        param("id_especialidad")
            .isInt().withMessage("El id_especialidad debe ser un numero entero"),
        validar
    ],
    autorizarRoles([2]),
    buscarMedicosPorEspecialidad
);

/**
 * @swagger
 * /api/v1/medicos/{id}/obras-sociales:
 *   post:
 *     summary: Asociar obras sociales a un médico
 *     tags:
 *       - Médicos
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
 *               obras_sociales:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_obra_social:
 *                       type: integer
 *             required:
 *               - obras_sociales
 *     responses:
 *       201:
 *          description: "Especialidad asociada con obra social"
 */
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

    ],
    autorizarRoles([3]),
    asociarMedicosObrasSociales
)


/**
 * @swagger
 * /api/v1/medicos/{id_medico}/especialidades:
 *   put:
 *     summary: Asociar especialidad a un médico
 *     tags:
 *       - Médicos
 *     parameters:
 *       - in: path
 *         name: id_medico
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
 *               id_especialidad:
 *                 type: integer
 *             required:
 *               - id_especialidad
 *     responses:
 *       200:
 *         description: Especialidad asociada

 */
router.put("/:id_medico/especialidades",
     [
        param("id_medico")
            .notEmpty().withMessage("El id del médico es obligatorio")
            .isInt().withMessage("El id debe ser un numero entero"),
        body("id_especialidad")
            .notEmpty().withMessage("El id de especialidad es obligatorio")
            .isInt().withMessage("El id de especialidad debe ser un valor numerico"),
        validar

    ],
    autorizarRoles([3]),
    asociarMedicosEspecialidades)

export { router };