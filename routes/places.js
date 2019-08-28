/**
* Places routes
*/
const express = require('express')
const router = express.Router()

const PlacesController = require('../controllers/PlacesController')

// Index route
router.get('/', PlacesController.index)

// Create route
router.post('/', PlacesController.create)

// Update route
router.put('/', PlacesController.update)

module.exports = router
