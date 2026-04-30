import { pool } from "./conexion-sql.js";

export async function testDB(){
    try{
        const con = await pool.getConnection();
        console.log("Conectado a la base de datos")
        const [rows, fields] = await con.query("SELECT nombre FROM especialidades")
        console.table(rows)
        }
        catch(err){
            console.log("Error al hacer la query de test: ", err)
        }
}