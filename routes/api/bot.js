/**
* Bot routes
*/
const express = require('express')
const router = express.Router()

const BotController = require('../../controllers/BotController')

// Create route (Slack)
router.post('/', BotController.create)

module.exports = router
