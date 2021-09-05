const validUrl = require('valid-url')

function judgeLink(link) {
  if (!validUrl.isWebUri(link)) {
    return {
      error: true,
      value: 'Please input a valid link.'
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
  let shortenCode = ''
  for ( let i = 0; i < 5 ; i++) {
    const index = Math.floor(Math.random() * splitLibrary.length)
    shortenCode += splitLibrary[index]
  }
  
  return shortenCode
} 

const helper = {
  shortLinkGenerator: shortLinkGenerator,
  judgeLink: judgeLink
}


module.exports = helper