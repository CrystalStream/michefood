/**
* HomeController
*/
const debug = require('debug')('michefood:ctrl:home-ctrl')

/**
 * Render the home landing page
 * @param {req} _
 * @param {res} res
 */
function index (_, res) {
  console.log('entro al index')
  res.render('home/index', {})
}

module.exports = {
  index
}
