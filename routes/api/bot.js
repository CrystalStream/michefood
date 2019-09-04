/**
* Places routes
*/
const express = require('express')
const router = express.Router()

const BotController = require('../../controllers/BotController')

// Index route
router.get('/', BotController.index)

module.exports = router
