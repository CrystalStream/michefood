const mongoServer = require('mongodb-memory-server').MongoMemoryServer

const DB = require('../db/database')

const server = new mongoServer()

const startDB = async () => {
  try {
     const url = await server.getConnectionString()
     await DB.connect(url)
  } catch (err) {
    throw err
  }
}

const stopDB = () => {
  DB.disconnect()
}

module.exports = {
  startDB,
  stopDB
}
