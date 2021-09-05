const express = require('express')
const router = express.Router()
const ShortLink = require('./models/linkShortener')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
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
        const shortenLink = hostName + shortenLinkObj.value

        return ShortLink.create({ inputLink, shortenLink })
          .then(() => res.render('index', { shortenLinkObj, inputLink, shortenLink }))
          .catch(error => console.log(error))
      }
    })
})

router.get('/:shortenLink', (req, res) => {
  const link = hostName + (req.params.shortenLink)
  ShortLink.findOne({ shortenLink: link })
    .then(function (obj) {
      res.redirect(obj.inputLink)
    })
    .catch(error => console.log(error))
})

module.exports = router 