/**
 * Utils
 */


 function validateFbURL(url) {
  const pattern = new RegExp('^(https?:\/\/www.facebook.com\/.{3,})','gi')

  return pattern.test(url)
 }

 module.exports = {
  validateFbURL
 }
