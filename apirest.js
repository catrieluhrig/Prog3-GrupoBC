//Grupo BC
//Integrantes: Sieza Sergio, Morabito Flavia, Guerrero Daiana, Revollo Federico, Uhrig Catriel.

import express from "express";

const app = express();

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