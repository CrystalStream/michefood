/**
 * Facebook Service
 */
const graph = require('fbgraph')
const models = require('../db/database').models

graph.setVersion(process.env.FB_GRAPH_VER || '4.0')
graph.setAccessToken(process.env.FB_APP_TOKEN)

async function addPlace (placeUrl) {
  const url = new URL(placeUrl)
  const place = await getPlaceFromFb(url)
  return new Promise((resolve, reject) => {
    if (!place) reject(new Error('Error adding a place from fb'))
    models.PlaceModel.create(place)
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

function getPlaceFromFb (url) {
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
      .catch(error => {
        reject(error)
      })
  })
}

function getPlaceID (identifier) {
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
