const debug = require('debug')('michefood:ctrl:places')
const models = require('../db/database').models

/**
 * PlacesController
 */
function index (_, res) {
  return models.PlacesModel.find({})
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      debug('Error - PlacesController@index: ', err)
      res.json({ message: 'Error on index places', error: err })
    })
}

function create (req, res) {
  return models.PlacesModel.create(req.body)
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      debug('Error - PlacesController@create: ', err)
      res.json({ message: 'Error on create places', error: err })
    })
}

module.exports = {
  index,
  create
}
