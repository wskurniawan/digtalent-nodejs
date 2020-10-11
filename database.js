import sqlite from 'sqlite3'

export function connectDB() {
  return new sqlite.Database('data', (err) => {
    if (err) {
      throw err
    }

    console.log('db created')
  })
}

/**
 * 
 * @param {sqlite.Database} db 
 */
export function initTable(db) {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS product  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      photo TEXT NOT NULL,
      name VARCHAR(56) NOT NULL,
      price INTEGER NOT NULL
    );`)
  })
}

/**
 * 
 * @param {sqlite.Database} db 
 * @param {string} name 
 * @param {number} price 
 * @param {string} photo 
 */
export function insertProduct(db, name, price, photo) {
  db.run('INSERT INTO product (photo,name,price) VALUES ($photo,$name,$price)', { $photo: photo, $name: name, $price: price }, (err) => {
    if (err) {
      throw err
    }

    console.log('product saved')
  })
}

/**
 * 
 * @param {sqlite.Database} db 
 */
export function getProduct(db) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM product', (err, result) => {
      if (err) {
        reject(err)
      }
  
      if (result) {
        resolve(result)
      } else {
        resolve([])
      }
    })
  })
}

/**
 * 
 * @param {sqlite.Database} db 
 * @param {number} id 
 */
export function deleteProduct(db, id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM product WHERE id = ?', id, (err) => {
      if(err) {
        reject(err)
      }

      resolve()
    })
  })
}