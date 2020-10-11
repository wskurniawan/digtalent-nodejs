import mysql from 'mysql2'

export function connectDB() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'product_catalog'
  })
}