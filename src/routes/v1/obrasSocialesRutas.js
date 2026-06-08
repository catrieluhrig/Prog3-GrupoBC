import express  from 'express';
import { body } from "express-validator";
import { param } from "express-validator";
import { validar } from "../../middlewares/middleware.js";
import {
    buscarObrasSociales,
    buscarObraSocialPorId,
    crearObraSocial,
    actualizarObraSocial,
    eliminarObraSocial
} from "../../controllers/controllerObrasSociales.js";

const router = express.Router();

router.get('/', buscarObrasSociales);

router.get("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    buscarObraSocialPorId)

router.post( "/",
    [
        body("nombre")
            .notEmpty().withMessage("El nombre es obligatorio")
            .isLength({max: 120}).withMessage("Máximo de 120 caracteres"),
            validar,
        body("descripcion")
            .notEmpty().withMessage("La descripcion es obligatoria")
            .isLength({max: 120}).withMessage("Máximo de 120 caracteres"),
            validar,
        body("porcentaje_descuento")
            .isNumeric().withMessage("El porcentaje de descuento debe ser un valor númerico")
            .notEmpty().withMessage("El porcentaje de descuento es obligatoria"),
            validar,
        body("es_particular")
            .notEmpty().withMessage("El atributo es_particular es obligatorio"),
            validar,
    ],
    crearObraSocial
)
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
     actualizarObraSocial
)
router.delete("/:id",
    [
        param("id").isInt().withMessage("El id debe ser un numero entero"),
        validar
    ],
    eliminarObraSocial
)

export { router };