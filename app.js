const express = require('express')
const exhbs = require('express-handlebars')
const mongoose = require('mongoose')
const ShortLink = require('./models/linkShortener')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000


mongoose.connect('mongodb://localhost/linkShortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb erro!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exhbs({ defultLayout: 'main', extname:'.hbs'}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(routes)

    
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
