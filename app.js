const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// Init env vars
require('dotenv').config()

const placesRouter = require('./routes/api/places')
const dailyTopRouter = require('./routes/api/dailyTop')

const app = express()

// Dont log for test
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('combined'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/places', placesRouter)
app.use('/api/daily', dailyTopRouter)

module.exports = app
