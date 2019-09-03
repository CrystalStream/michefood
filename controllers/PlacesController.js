/**
* PlacesController
*/
const debug = require('debug')('michefood:ctrl:places-ctrl')
const models = require('../db/database').models

/**
 * Return a list of all places
 * @param {req} _
 * @param {res} res
 * @returns {Places[]} data
 */
function index (_, res) {
  return models.PlaceModel.find({})
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      debug('Error - PlacesController@index: ', err)
      res.json({ message: 'Error on index places', error: err })
    })
}

/**
 * Return one place
 * @param {req} _
 * @param {res} res
 * @returns {Places} data
 */
function find (req, res) {
  const { id } = req.params
  return models.PlaceModel.findOne({ _id: id })
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      debug('Error - PlacesController@find: ', err)
      res.json({ message: 'Error on find place', error: err })
    })
}

/**
 * Create a new place
 * @param {*} req
 * @param {*} res
 * @returns {Place} data
 */
function create (req, res) {
  return models.PlaceModel.create(req.body)
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      debug('Error - PlacesController@create: ', err)
      res.json({ message: 'Error on create places', error: err })
    })
}

/**
 * Update a place
 * @param {*} req
 * @param {*} res
 * @returns {Place} data
 */
function update (req, res) {
  const { id } = req.params
  return models.PlaceModel.updateOne({ _id: id }, { ...req.body })
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      debug('Error - PlacesController@udpate: ', err)
      res.json({ message: 'Error on udpate place: ' + id, error: err })
    })
}

module.exports = {
  index,
  find,
  create,
  update
}
