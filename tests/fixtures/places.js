const faker = require('faker')

const PlacesFixtures = new Array(10).fill().map(() => {
  return {
    "name": faker.company.companyName(),
    "description": faker.company.catchPhrase(),
    "cover": faker.image.imageUrl(),
    "facebookUrl": faker.internet.url(),
    "phone": faker.phone.phoneNumber(),
    "address": faker.address.streetAddress(),
  }
})

module.exports = PlacesFixtures
