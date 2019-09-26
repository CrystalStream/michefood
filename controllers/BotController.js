/**
* BotController
*/
const debug = require('debug')('michefood:ctrl:bot-ctrl')
const models = require('../db/database').models
const SlackService = require('../services/SlackService')
const FacebookService = require('../services/FacebookService')
const utils = require('../utils')
/**
 * Return a random list of places
 * @param {req} _
 * @param {res} res
 * @returns {Places[]} data
 */
async function index (req, res) {

  // Handler for the check route on slack
  if (req.body.challenge) {
    res.send({ 'challenge': req.body.challenge })
    return
  }

  let { event: { type, text, channel }} = req.body

  // inmediate response for slack bot
  res.sendStatus(200)

  if (type === 'app_mention') {
    const commands = text.split(' ')
    if (commands.length > 2) {
      const [, action, ...body ] = commands

      if (!body.length) {
        SlackService.sendBotResponse('Necesito mas informacion :mestasenojando:', channel)
        return
      }

      switch (action) {

        case 'add':
          const fbUrl = body[0].replace(/(<?>?)/g, '')
          // validate url
          const validUrl = utils.validateFbURL(fbUrl)
          if (validUrl) {
            const newlyPlace = await FacebookService.addPlace(fbUrl)
            const message = `
              Listo!\nSe agrego ${newlyPlace.name} a nuestra lista de lugares.\nGracias por contribuir! :michelove:
            `
            SlackService.sendBotResponse(message, channel)
          } else {
            SlackService.sendBotResponse('Lo siento, no pude con ese facebok :sad: ', channel)
          }
          break

        default:
          SlackService.sendBotResponse('Opciones disponibles: <list>', channel)
      }
    } else {
      SlackService.sendBotResponse('Intentalo otra vez :sad:', channel)
    }
  }
  // const promise = models.PlaceModel.aggregate().sample(5).exec()

  // return promise
  //   .then(function (data) {
  //     res.json(data)
  //   })
  //   .catch(function (err) {
  //     debug('Error - BotController@index: ', err)
  //     res.json({ message: 'Error on index daily top', error: err })
  //   })
}

module.exports = {
  index
}
