const express = require('express')
const router = express.Router()

const PlacesController = require('../controllers/PlacesController')

/**
 * Index places:
 * Return a list of places
 */
router.get('/', PlacesController.index)
router.post('/', PlacesController.create)

module.exports = router
