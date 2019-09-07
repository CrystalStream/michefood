/**
* Home routes
*/
const express = require('express')
const router = express.Router()

const HomeController = require('../../controllers/HomeController')

// Index route
router.get('/', HomeController.index)

module.exports = router
