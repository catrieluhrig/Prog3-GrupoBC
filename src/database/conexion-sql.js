import mysql from "mysql2/promise"

process.loadEnvFile()

export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    connectionLimit: 10
})