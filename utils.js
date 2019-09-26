/**
 * Utils
 */


 function validateFbURL(url) {
  const pattern = new RegExp('^(https?:\/\/www.facebook.com/.*)','gi')

  return pattern.test(url.replace(/(<?>?)/g, ''))
 }

 module.exports = {
  validateFbURL
 }
