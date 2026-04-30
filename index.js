//Grupo BC
//Integrantes: Sieza Sergio, Morabito Flavia, Guerrero Daiana, Revollo Federico, Uhrig Catriel.

import express from "express";
import { testDB } from "./DB_TEST/test_db.js"

const app = express();

await testDB();

app.get("/", (req, res) => {
    console.log("testing")
    res.status(200).send({
        "status": "HTTP 200 OK",
        "msg": "request completada"
    })
})

process.loadEnvFile()
const PUERTO = process.env.PUERTO

app.listen(PUERTO || 3000, () => {
    console.log("Servidor iniciado en puerto 3000")
})

