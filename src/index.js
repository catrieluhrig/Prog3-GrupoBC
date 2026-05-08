//Grupo BC
//Integrantes: Sieza Sergio, Morabito Flavia, Guerrero Daiana, Revollo Federico, Uhrig Catriel.

import express from "express";
import { pool } from "./database/conexion-sql.js";
import { router } from "./routes/especialidadesRutas.js"

const app = express();
app.use(express.json());

app.use("/especialidades", router);

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log("Servidor iniciado en puerto 3000");
})

