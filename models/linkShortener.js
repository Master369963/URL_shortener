const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const linkSchema = new Schema ({
  inputLink: {
    type: String,
    required: true
  },
  shortenCode: {
    type: Object,
    required: false
  },
})

module.exports = mongoose.model('ShortLink', linkSchema)