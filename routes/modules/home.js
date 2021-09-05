const express = require('express')
const router = express.Router()
const ShortLink = require('../../models/linkShortener')
const helper = require('../../shortlink_generator')
const hostName = 'http://localhost:3000/'

router.get('/', (req, res) => {
  res.render('index')
})


router.post('/', (req, res) => {
  const inputLink = req.body.URLlink
  ShortLink.findOne({ inputLink: inputLink})
    .lean()
    .then(function (obj) {
      if (obj) {
        let shortenLinkObj = {
          error: false,
          value: hostName + obj.shortenCode
        }
        return res.render('index', { shortenLinkObj, inputLink })
      } else {
        const shortenLinkObj = helper.judgeLink(inputLink)
        const shortenCode = shortenLinkObj.value
        if (!shortenLinkObj.error) {
          shortenLinkObj.value = hostName + shortenLinkObj.value
        
          while (ShortLink.findOne({ shortenLink: shortenCode === false})) {
            return ShortLink.create({ inputLink, shortenCode })
              .then(() => res.render('index', { shortenLinkObj, inputLink }))
              .catch(error => console.log(error))
          }
        } 
          res.render('index', { shortenLinkObj, inputLink })
      } 
    })
})

router.get('/:shortenLink', (req, res) => {
  const code = req.params.shortenLink
  const fullLink = hostName + (req.params.shortenLink)

  ShortLink.findOne({ shortenCode: code })
    .then(function (obj) {
      res.redirect(obj.inputLink)
    })
    .catch(error => console.log(error))
})

module.exports = router 