import express from 'express'
import hbs from 'hbs'
import path from 'path'

const app = express()

app.set('views', path.join(__dirname, '/layout'))
app.set('view engine', 'html')
app.engine('html', hbs.__express)

// app route


app.listen(8000, () => {
  console.log('app listen on port 8000')
})