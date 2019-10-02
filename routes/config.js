/**
* Config routes
*/
const express = require('express')
const router = express.Router()

const ConfigController = require('../controllers/ConfigController')

// Index route
router.post('/', ConfigController.index)

module.exports = router
