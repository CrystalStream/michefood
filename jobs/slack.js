/**
 * Slack Jobs
*/
const debug = require('debug')('michefood:jobs:slack')
const cron = require('node-cron')
const SlackService = require('../services/SlackService')
const models = require('../db/models')
const utils = require('../utils')

const LUNCH_TIME = process.env.SLACK_JOB_SCHEDULE || '00 14 * * 1-5' // '* * * * 1-5'
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID || 'CN4A5PB24' // 'CBXLG6XCG'

// Publish information each day at lunch time (exclude sat and sun)
const slackCron = cron.schedule(LUNCH_TIME, async function () {
  // Get 5 random places
  const places = await models.PlaceModel.aggregate().sample(5)

  // Create the actual slack message
  const message = utils.createPlacesMessage(places)

  // Send to slack
  SlackService.sendBotResponse(message, CHANNEL_ID, true)
}, {
  scheduled: false
})

module.exports = {
  start: function () {
    debug('[JOB STARTED]: Slack Job')
    slackCron.start()
  },
  stop: function () {
    debug('[JOB STOPPED]: Slack Job')
    slackCron.stop()
  }
}
