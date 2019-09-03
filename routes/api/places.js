/**
* Places routes
*/
const express = require('express')
const router = express.Router()

const PlacesController = require('../../controllers/PlacesController')

// Index route
router.get('/', PlacesController.index)

// Find route
router.get('/:id', PlacesController.find)

// Create route
router.post('/', PlacesController.create)

// Update route
router.put('/:id', PlacesController.update)

module.exports = router
