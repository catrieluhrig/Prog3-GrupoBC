//Grupo BC
//Integrantes: Sieza Sergio, Morabito Flavia, Guerrero Daiana, Revollo Federico, Uhrig Catriel.

import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("testing")
})

app.listen("3000", () => {
    "Servidor iniciado en puerto 3000"
})