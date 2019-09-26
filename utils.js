/**
 * Utils
*/

const BOT_OPTIONS = [
  'add'
]

function validateFbURL(url) {
  const pattern = new RegExp('^(https?:\/\/www.facebook.com\/.{3,})','gi')

  return pattern.test(url)
}

module.exports = {
  BOT_OPTIONS,
  validateFbURL
}
