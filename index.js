//Grupo BC
//Integrantes: Sieza Sergio, Morabito Flavia, Guerrero Daiana, Revollo Federico, Uhrig Catriel.

import express from "express";
import { pool } from "./DB_TEST/conexion-sql.js"
import { testDB } from "./DB_TEST/test_db.js"
import { validar } from "./middlewares/middleware.js"
import { param } from "express-validator"
import { check } from "express-validator"

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

app.post("/especialidades", [
    check("nombre")
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isLength({max: 120}).withMessage("El nombre no puede ser mayor a 120 caracteres"),
    validar
    ],
    async (req, res) => {
        try{
            const { nombre } = req.body;
            const query = "INSERT INTO especialidades (nombre) VALUES (?)";
            const [result] = await pool.execute(query, [nombre]); //El segundo parametro de execute() debe ser un array
            res.status(201).send({
                "status": "HTTP 201",
                "msg": "Especialidad insertada correctamente"
            })
        } 
        catch(error){
            console.log("Error de red al insertar especialidad: ", error)
        }
    } 
)

app.put("/especialidades/:id_especialidad", [
    check("nombre")
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isLength({max: 120}).withMessage("El nombre no puede ser mayor a 120 caracteres"),
    param("id_especialidad").isInt().withMessage("El parámetro debe ser un numero entero"),
    validar
    ], async (req, res) => {
    try{
        const { nombre } = req.body;
        const id_especialidad = req.params.id_especialidad;

        //Validar que la id pasada por parámetro exista/esté activa
        const especialidadesActivas = "SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?"
        const [especialidades, fields] = await pool.execute(especialidadesActivas, [id_especialidad]);
        if(especialidades.length === 0){
            return res.status(404).send({
                "status": "HTTP 404",
                "msg": "Especialidad no encontrada"
            })
        }

        //Actualizar la especialidad
        const query = "UPDATE especialidades set nombre = ? WHERE id_especialidad = ?"
        const [result] = await pool.execute(query, [nombre, id_especialidad])
        res.status(200).send({
            "status": "200",
            "msg": "Especialidad modificada con exito"
        })
    }
    catch(error){
        console.log("Error al actualizar la especialidad: ", error)
    }
})

app.delete("/especialidades/:id_especialidad", [], async (req, res) => {
    try{
        const id_especialidad = req.params.id_especialidad
        //Validar que la id pasada por parámetro exista/esté activa
        const especialidadesActivas = "SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?"
        const [especialidades, fields] = await pool.execute(especialidadesActivas, [id_especialidad]);
        if(especialidades.length === 0){
            return res.status(404).send({
                "status": "HTTP 404",
                "msg": "Especialidad no encontrada"
            })
        }

        const query = "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?"
        const result = await pool.execute(query, [id_especialidad])
        res.status(200).send({
            "status": "200",
            "msg": "Especialidad eliminada con exito"
        })
    }catch(error){
        console.log("Error al borrar la especialidad: ", error)
    }
})

process.loadEnvFile()
const PUERTO = process.env.PUERTO

app.listen(PUERTO || 3000, () => {
    console.log("Servidor iniciado en puerto 3000")
})

