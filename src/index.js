//Grupo BC
//Integrantes: Sieza Sergio, Morabito Flavia, Guerrero Daiana, Revollo Federico, Uhrig Catriel.

import express from "express";
import morgan from "morgan";
import fs from "fs"
import { pool } from "./database/conexion-sql.js";
import passport from "passport"
import { estrategia, validarToken } from './config/passport.js';
import { router as v1EspecialidadesRoutes } from "./routes/v1/especialidadesRutas.js"
import { router as v1ObrasSocialesRoutes } from "./routes/v1/obrasSocialesRutas.js"
import { router as v1MedicosRoutes } from "./routes/v1/medicosRutas.js"
import { router as v1PacientesRoutes } from "./routes/v1/pacientesRutas.js"
import { router as v1TurnosRoutes } from "./routes/v1/turnosRutas.js"
import { router as v1AutenticacionRoutes } from "./routes/v1/autenticacionRutas.js"

const app = express();
app.use(express.json());
passport.use(estrategia);
passport.use(validarToken);
app.use(passport.initialize());

const logStream = fs.createWriteStream("./access.log", { flags: "a"});
app.use(morgan("dev"));
app.use(morgan("combined", {stream: logStream}));

app.use("/api/v1/especialidades", passport.authenticate('jwt', {session:false}), v1EspecialidadesRoutes);
app.use("/api/v1/obras-sociales", v1ObrasSocialesRoutes)
app.use("/api/v1/medicos", v1MedicosRoutes)
app.use("/api/v1/pacientes", v1PacientesRoutes)
app.use("/api/v1/turnos-reservas", passport.authenticate('jwt', {session:false}), v1TurnosRoutes)
app.use("/api/v1/auth", v1AutenticacionRoutes)

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log("Servidor iniciado en puerto 3000");
})