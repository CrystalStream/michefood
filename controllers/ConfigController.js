/**
* ConfigController
*/
const slackJob = require('../jobs/slack')

/**
 * Render the home landing page
 * @param {req} _
 * @param {res} res
 */
function index (req, res) {
  const options = req.body
  Object.keys(options).forEach(k => {
    if (k === 'slack_job') {
      const fn = options[k] === 'on' ? slackJob.start : slackJob.stop
      fn()
    }
  })
  res.json({ message: 'Success action' })
}

module.exports = {
  index
}
