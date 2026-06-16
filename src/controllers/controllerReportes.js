import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { generarPDF } from "../services/serviceReportes.js";


export const generarReporte = async (req, res) => {
    try {
        const pdf = generarPDF()

        res.status(200).send({
            status: true,
            msg: "Reporte generado correctamente",
        });
    } catch (error) {
        console.log("Error al generar el reporte: ", error);
        res.status(500).send({
            status: false,
            error: error.message
        });
    }
}