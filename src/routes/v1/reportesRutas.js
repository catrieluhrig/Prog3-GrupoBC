import express from "express";
import { generarReporte } from "../../controllers/controllerReportes.js";

const router = express.Router();

router.get("/", generarReporte);

export { router };
