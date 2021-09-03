const mongoose = require('mongoose')
const Schema = mongoose.Schema
const linkSchema = new Schema ({
  inputLink: {
    type: String,
    required: true
  },
  shortenLink: {
    type: Object,
    required: false
  },
})

module.exports = mongoose.model('ShortLink', linkSchema)