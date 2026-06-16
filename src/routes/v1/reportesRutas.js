import express from "express";
import { autorizarRoles } from "../../middlewares/autorizarRoles.js";
import { generarReporte } from "../../controllers/controllerReportes.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/reportes:
 *   get:
 *     summary: Generar reporte
 *     tags:
 *       - Reportes
 *     responses:
 *       200:
 *         description: Reporte generado
 */
router.get("/", autorizarRoles([3]), generarReporte);

export { router };
