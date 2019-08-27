const mongoose = require('mongoose')
const models = require('./models')

const connectDb = function () {
  return mongoose.connect(process.env.DATABASE_URL);
}

module.exports = connectDb
module.exports.models = models
