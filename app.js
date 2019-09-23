const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// Init env vars
require('dotenv').config()

const homeRouter = require('./routes/home')
const placesRouter = require('./routes/api/places')
const botRouter = require('./routes/api/bot')

const app = express()

// Dont log for test
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('combined'))
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('', homeRouter)
app.use('/api/places', placesRouter)
app.use('/api/bot', botRouter)

module.exports = app
