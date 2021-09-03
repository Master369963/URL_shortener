const express = require('express')
const exhbs = require('express-handlebars')
const mongoose = require('mongoose')
const helper = require('./shortlink_generator')
const ShortLink = require('./models/linkShortener')

const app = express()
const port = 3000

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

app.get('/', (req, res) => {
  res.render('index')
})

// app.post('/', (req, res) => {
//   const inputLink = req.body.URLlink
//   console.log(inputLink)
//   const shortenLink = helper.judgeLink(inputLink)
//   res.render('index', { shortenLink, inputLink })
// })

// app.post('/', (req, res) => {
//   const inputLink = req.body.URLlink
//   const shortenLinkObj = helper.judgeLink(inputLink)
//   const shortenLink = shortenLinkObj.value
//     return ShortLink.create({ inputLink, shortenLink })
//       .then(() => res.render('index', { shortenLinkObj, inputLink }))
//       .catch(error => console.log(error))
//   })

app.post('/', (req, res) => {
  const inputLink = req.body.URLlink

  ShortLink.find()
    .lean()
    .then(inputLinks => {
      targetURL = inputLinks.filter(eachLink => eachLink.inputLink === inputLink)
      if (targetURL.length === 1) {
        let shortenLinkObj = {
          error: false,
          value: targetURL[0].shortenLink
        }
        return res.render('index', { shortenLinkObj, inputLink })

      } else {
        const shortenLinkObj = helper.judgeLink(inputLink)
        const shortenLink = shortenLinkObj.value
        return ShortLink.create({ inputLink, shortenLink })
          .then(() => res.render('index', { shortenLinkObj, inputLink }))
          .catch(error => console.log(error))
      }
    })
})

// app.get('/:shortenLink', (res, req) => {
//   const link = req.parms.shortenLink
//   console.log(link)
//   return ShortLink.find({ inputLink: { $regex: 'link' } }) 
//     .lean()
//     .then(link => {
//       res.render('index', { shortenLink })
//     })
// })


app.listen(port, () => {
  console.log('App is running!')
})