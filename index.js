//Grupo BC
//Integrantes: Sieza Sergio, Morabito Flavia, Guerrero Daiana, Revollo Federico, Uhrig Catriel.

import express from "express";
import { pool } from "./DB_TEST/conexion-sql.js"
import { testDB } from "./DB_TEST/test_db.js"

const app = express();
app.use(express.json());

await testDB();

app.get("/", (req, res) => {
    console.log("testing")
    res.status(200).send({
        "status": "HTTP 200 OK",
        "msg": "request completada"
    })
})

app.post("/especialidades", async (req, res) => {
    try{
        const { nombre } = req.body
        const query = "INSERT INTO especialidades (nombre) VALUES (?)"
        const [result] = await pool.execute(query, [nombre]) //El segundo parametro de execute() debe ser un array
        res.status(201).send({
            "status": "HTTP 201",
            "msg": "Especialidad insertada correctamente"
        })
    } 
    catch(error){
        console.log("Error de red al insertar especialidad: ", error)
    }
    
})

process.loadEnvFile()
const PUERTO = process.env.PUERTO

app.listen(PUERTO || 3000, () => {
    console.log("Servidor iniciado en puerto 3000")
})

