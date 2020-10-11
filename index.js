import express from 'express'
import hbs from 'hbs'
import path from 'path'

const __dirname = path.resolve()

const app = express()

app.use('/assets', express.static(path.join(__dirname, '/assets')))
app.set('views', path.join(__dirname, '/layout'))
app.set('view engine', 'html')
app.engine('html', hbs.__express)

// app route
app.get('/login', (req, res, next) => {
  res.render('login')
})

app.get('/search-product', (req, res, next) => {
  res.render('search-product')
})

app.use((req, res, next) => {
  return next(new Error('404: Halaman tidak ditemukan'))
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.render('default-error')
})

app.listen(8000, () => {
  console.log('app listen on port 8000')
})