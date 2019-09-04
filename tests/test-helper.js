const mongoServer = require('mongodb-memory-server').MongoMemoryServer

const DB = require('../db/database')
const models = require('../db/database').models

const server = new mongoServer()

const startDB = async () => {
  try {
     const url = await server.getConnectionString()
     await DB.connect(url)
     return fillDB()
  } catch (err) {
    throw err
  }
}

const stopDB = async () => {
  await clearDB()
  return DB.disconnect()
}

const fillDB = () => {
  const data = require('./fixtures/places.js')
  return models.PlaceModel.insertMany(data)
}

const clearDB = () => {
  return models.PlaceModel.deleteMany({})
}

module.exports = {
  startDB,
  stopDB
}
