const mongoServer = require('mongodb-memory-server').MongoMemoryServer
const nock = require('nock')

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

const mockSlackInternalRequest = (method) => {
  return nock('https://slack.com/api')
    [method]('/chat.postMessage')
    .reply(200, { text: 'message published' })
}

const mockFbPlaceInternalRequest = () => {
  return nock('https://graph.facebook.com/')
    .get(/\/v4.0\/+[0-9]*$/gm)
    .query(true)
    .reply(200, {
      name: 'tacos ahumados',
      description: 'taco bueno',
      cover: {
        source: 'imagenchida.png'
      },
      link: 'https:fburl.com/tacosahumados',
      phone: '123123124',
      single_line_address: 'San fernando'
    })
}

const mockFbIDInternalRequest = () => {
  return nock('https://graph.facebook.com/v4.0/')
    .get('/search')
    .query(true)
    .reply(200, { data: [
      {
        id: '222222222'
      }
    ]})
}

module.exports = {
  startDB,
  stopDB,
  mockSlackInternalRequest,
  mockFbPlaceInternalRequest,
  mockFbIDInternalRequest
}
