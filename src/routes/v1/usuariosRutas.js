import express from "express";
import { param } from "express-validator";
import multer from "multer";
import { storage } from "../../config/multer.js";
import { validar } from "../../middlewares/middleware.js";
import { actualizarFotoPerfil } from "../../controllers/controllerUsuarios.js";

const router = express.Router();
const upload = multer({ storage });

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
