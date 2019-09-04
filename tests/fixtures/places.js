const faker = require('faker')

const PlacesFixtures = new Array(10).fill().map(() => {
  return {
    "name": faker.company.companyName,
    "description": faker.company.catchPhrase,
    "images": [],
    "facebookUrl": faker.internet.url
  }
})

module.exports = PlacesFixtures
