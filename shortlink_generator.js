const ShortLink = require('./models/linkShortener')

function judgeLink(link) {
  if ((link.length === 0) || (link.includes('https://') == ! true)) {
    return {
      error: true,
      value:'Please input a valid link.'
    }
  } else {
    return {
      error: false,
      value: shortLinkGenerator(link)
    }
  }
}

function shortLinkGenerator(link) {
  const library = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const splitLibrary = library.split('')
  let shortenLink = 'https://aga-url-shortener.herokuapp.com/'

  for ( let i = 0; i < 5 ; i++) {
    const index = Math.floor(Math.random() * splitLibrary.length)
    shortenLink += splitLibrary[index]
  }
  return shortenLink
} 

const helper = {
  shortLinkGenerator: shortLinkGenerator,
  judgeLink: judgeLink
}

// function checkLink (inputLlink) {
//   if ()
// }

module.exports = helper