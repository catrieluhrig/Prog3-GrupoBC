import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { obtenerEstadisticas } from "../database/reportes.js";


export const generarReporte = async (req, res) => {
    try {
        const [resultSets] = await obtenerEstadisticas();
        const [totalResult, atendidosResult, especialidadesResult] = resultSets || [];

        //Si los resultados no existen devolver 0 
        const totalTurnos = totalResult?.[0]?.total_turnos ?? 0;
        const atendidos = atendidosResult?.[0]?.atendidos ?? 0;
        const pendientes = atendidosResult?.[0]?.pendientes ?? 0;
        const turnosPorEspecialidad = especialidadesResult || [];

        const doc = new PDFDocument({ margin: 40 });

        //Definir la ruta y nombre del archivo
        const reportsDir = path.join(process.cwd(), "src", "reports");
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }

        const fileName = `reporte-estadisticas-${Date.now()}.pdf`;
        const filePath = path.join(reportsDir, fileName);

        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        doc.fontSize(18).font("Helvetica-Bold").text("Reporte de estadísticas", { align: "center" });
        doc.moveDown(0.5);
        doc.fontSize(12).font("Helvetica").text(`Total de turnos: ${totalTurnos}`);
        doc.text(`Atendidos: ${atendidos}`);
        doc.text(`Pendientes: ${pendientes}`);
        doc.moveDown(1);
        doc.fontSize(14).font("Helvetica-Bold").text("Turnos por especialidad");
        doc.moveDown(0.5);

        turnosPorEspecialidad.forEach((item) => {
            doc.fontSize(11).font("Helvetica").text(`• ${item.nombre}: ${item.cantidad}`);
        });

        doc.end();

        await new Promise((resolve, reject) => {
            writeStream.on("finish", resolve);
            writeStream.on("error", reject);
        });

        if (!fs.existsSync(filePath)) {
            throw new Error("No se pudo crear el archivo PDF");
        }

        res.status(200).send({
            status: true,
            msg: "Reporte generado correctamente",
            archivo: fileName,
            ruta: `/src/reports/${fileName}`
        });
    } catch (error) {
        console.log("Error al generar el reporte: ", error);
        res.status(500).send({
            status: false,
            error: error.message
        });
    }
}