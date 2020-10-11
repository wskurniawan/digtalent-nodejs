import mysql from 'mysql2'

export function connectDB() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'product_catalog'
  })
}

/**
 * 
 * @param {mysql.Connection} dbConnection 
 * @param {string} name 
 * @param {number} price 
 * @param {string} photo 
 */
export function insertProduct(dbConnection, name, price, photo) {
  dbConnection.query('INSERT INTO product SET ?', { name, price, photo }, (err) => {
    if(err) {
      console.log(err)
      throw err
    }
  })
}

/**
 * 
 * @param {mysql.Connection} dbConnection 
 */
export function getProduct(dbConnection) {
  dbConnection.query('SELECT * FROM product', (err, result) => {
    if(err) {
      console.log(err)
      throw err
    }
    console.log(result)
    return result
  })
}