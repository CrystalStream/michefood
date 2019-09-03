const mongoose = require('mongoose')
const models = require('./models')

const connectDB = function (url) {
  dbUrl = url || process.env.DATABASE_URL
  return mongoose.connect(dbUrl, { useNewUrlParser: true })
}

const disconnectDB = async function() {
  await mongoose.connection.close()
}

module.exports = {
  connect: connectDB,
  disconnect: disconnectDB
}

module.exports.models = models
