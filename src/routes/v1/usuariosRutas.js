import express from "express";
import { param } from "express-validator";
import multer from "multer";
import { storage } from "../../config/multer.js";
import { validar } from "../../middlewares/middleware.js";
import { actualizarFotoPerfil } from "../../controllers/controllerUsuarios.js";

const router = express.Router();
const upload = multer({ storage });

/**
 * @swagger
 * /api/v1/usuarios/{id_usuario}/foto:
 *   put:
 *     summary: Actualizar foto de perfil de usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *             required:
 *               - foto
 *     responses:
 *       200:
 *         description: Foto actualizada
 */
router.put(
  "/:id_usuario/foto",
  [
    param("id_usuario")
      .isInt()
      .withMessage("El id_usuario debe ser un numero entero"),
    validar
  ],
  upload.single("foto"),
  actualizarFotoPerfil
);

export { router };
