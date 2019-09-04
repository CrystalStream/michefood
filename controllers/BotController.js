/**
* PlacesController
*/
const debug = require('debug')('michefood:ctrl:botctrl')
const models = require('../db/database').models

/**
 * Return a random list of places
 * @param {req} _
 * @param {res} res
 * @returns {Places[]} data
 */
function index (_, res) {
  const promise = models.PlacesModel.aggregate().sample(3).exec()

  return promise.then(function (data) {
    res.json(data)
  })
    .catch(function (err) {
      debug('Error - BotController@index: ', err)
      res.json({ message: 'Error on index daily top', error: err })
    })
}

module.exports = {
  index
}
