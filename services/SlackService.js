/**
* SlackService
*/
const debug = require('debug')('michefood:service:slack')
const https = require('https')

const SLACK_CHAT_URL = 'https://slack.com/api/chat.postMessage'

function sendBotResponse(text, channel, withBlocks = false) {
  let data = JSON.stringify({
    text,
    channel,
  })

  // Blocks for slack use a different param
  if (withBlocks) {
    data = JSON.stringify({
      blocks: text,
      channel
    })
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
    }
  }

  const req = https.request(SLACK_CHAT_URL, options, (res) => {
    debug(`[POST] ${res.statusCode} ${SLACK_CHAT_URL}`)
  })

  req.on('error', error => {
    console.error(error)
  })

  req.end(data)
}

module.exports = {
  sendBotResponse
}
