/**
* HomeController
*/

/**
 * Render the home landing page
 * @param {req} _
 * @param {res} res
 */
function index (_, res) {
  res.render('home/index', {})
}

module.exports = {
  index
}
