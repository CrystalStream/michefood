/**
 * Facebook Service
 */
const graph = require('fbgraph')
const debug = require('debug')('michefood:service:fb')
const models = require('../db/database').models


graph.setVersion(process.env.FB_GRAPH_VER || '4.0');
graph.setAccessToken("EAABzzb19wKwBANid33KmZAGXhS91kjk5vAYvhyH27GaCkYj9n00ubMGatoQAFEWbstpt3lQil2ow2ZAnLeo6XBksgKsZBkZCYp80hQdyKfqmnwo3EEmcpMmdaVZAhESSJbLRqcoyGY7xY4ZBSdGK2y7GImtDKs1kf5GI6DBLZBldre3kkEcZBWzdaiPnpJspTOpaVCTQZBdhGSAJDVO8Ybjc71YETIW1cClvGJqHvhqhgZCgZDZD");

async function addPlace(placeUrl) {
  const url = new URL(placeUrl)
  const place = await getPlaceFromFb(url)
  return new Promise((resolve, reject) => {
    if (!place) reject(null)
    models.PlaceModel.create(place)
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        debug('Error - FacebookService@create: ', err)
        reject({ message: 'Error on create places from fb', error: err })
      })
  })
}

function getPlaceFromFb(url) {
  const urlIdentifier = url.pathname.split('/')[1]
  return new Promise((resolve, reject) => {
    getPlaceID(urlIdentifier)
      .then((placeID) => {
        const fields = [
          'single_line_address',
          'description',
          'cover',
          'link',
          'name',
          'phone'
        ]

        graph.get(`${placeID}?fields=${fields.join(',')}`, (error, res) => {
          if (error) reject(error)

          const place = {
            name: res.name,
            description: res.description,
            cover: res.cover ? res.cover.source : '',
            facebookUrl: res.link,
            phone: res.phone,
            address: res.single_line_address
          }
          resolve(place)
        })
      })
  })
}

function getPlaceID(identifier) {
  return new Promise((resolve, reject) => {
    graph.get(`search?type=place&q=${identifier}`, (error, res) => {
      if (error) reject(error)

      if (res.data && res.data.length) {
        const place = res.data[0] // Default to first match
        resolve(place.id)
      }

    })
  })
}

module.exports = {
  addPlace
}
