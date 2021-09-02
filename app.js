const express = require('express')
const exhbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('hbs', exhbs({ defultLayout: 'main', extname:'.hbs'}))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('App is running!')
})