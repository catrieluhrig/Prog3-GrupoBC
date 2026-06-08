//Grupo BC
//Integrantes: Sieza Sergio, Morabito Flavia, Guerrero Daiana, Revollo Federico, Uhrig Catriel.

import express from "express";
import { pool } from "./database/conexion-sql.js";
import { router as v1EspecialidadesRoutes } from "./routes/v1/especialidadesRutas.js"
import { router as v1ObrasSocialesRoutes } from "./routes/v1/obrasSocialesRutas.js"
import { router as v1MedicosRoutes } from "./routes/v1/medicosRutas.js"

const app = express();
app.use(express.json());

app.use("/api/v1/especialidades", v1EspecialidadesRoutes);
app.use("/api/v1/obrasSociales", v1ObrasSocialesRoutes)
app.use("/api/v1/medicos", v1MedicosRoutes)


process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log("Servidor iniciado en puerto 3000");
})

