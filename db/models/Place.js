const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
  name: String,
  description: String,
  cover: String,
  facebookUrl: String,
  phone: String,
  address: String
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place
