import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import joi from 'joi'

const __dirname = path.resolve()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/assets', express.static(path.join(__dirname, '/assets')))
app.set('views', path.join(__dirname, '/layout'))
app.set('view engine', 'html')
app.engine('html', hbs.__express)

// app route
app.get('/login', (req, res, next) => {
  res.render('login')
})

app.post('/login', (req, res, next) => {
  //form validation
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  })

  const result = schema.validate(req.body)
  if(result.error) {
    return next(result.error)
  }

  next()
}, (req, res, next) => {
  //action
  res.send(req.body)
})

app.get('/search-product', (req, res, next) => {
  res.render('search-product')
})

app.get('/search-product-handler', (req, res, next) => {
  //form validation
  const schema = joi.object({
    product: joi.string().required()
  })

  const result = schema.validate(req.body)
  if(result.error) {
    return next(result.error)
  }

  next()
}, (req, res, next) => {
  res.send(req.query)
})

app.use((req, res, next) => {
  return next(new Error('404: Halaman tidak ditemukan'))
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.render('default-error', { errorMessage: err.message })
})

app.listen(8000, () => {
  console.log('app listen on port 8000')
})