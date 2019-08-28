/**
* Places routes
*/
const express = require('express')
const router = express.Router()

const DailyTopController = require('../../controllers/DailyTopController')

// Index route
router.get('/', DailyTopController.index)

module.exports = router
