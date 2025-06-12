import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '1234567890',
    database: 'bacst',
})