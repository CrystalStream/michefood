// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

const testHelper = require('./test-helper')
const server = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

describe('Place', () => {
  before(async () => {
    // Start and seed the db
    await testHelper.startDB()
  })

  after(async () => {
    // Stop and clear the db
    await testHelper.stopDB()
  })

  describe('/GET Place', () => {
    it('should return a list of all places', (done) => {
      chai.request(server)
        .get('/api/places')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.lengthOf(10)
          done()
        })
    })
  })

  describe('/POST Place', () => {
    it('should create a new Place on the database', (done) => {
      const newPlace = {
        name: "Tacos de humo2",
        description: "Place for testing",
        facebookUrl: "www.facebook.com/test"
      }
      chai.request(server)
        .post('/api/places')
        .send(newPlace)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('name').to.be.equal(newPlace.name)
          done()
        })
    })
  })

  describe('/PUT Place', () => {
    it('should update the place', (done) => {
      const requester = chai.request(server).keepOpen()
      const newPlace = {
        name: "Carnes asadas y crudas",
        description: "Carnitas de las buenas",
        facebookUrl: "www.facebook.com/carnes"
      }
      requester
        .post('/api/places')
        .send(newPlace)
        .end((err, res) => {
          const id = res.body._id
          expect(err).to.be.null
          requester
            .put('/api/places/'+ id)
            .send({ name: "Carnes asadas nomas" })
            .end((err, _) => {
              expect(err).to.be.null
              requester
                .get('/api/places/'+ id)
                .end((err, res) => {
                  expect(err).to.be.null
                  expect(res.body).to.have.property('name').to.be.equal("Carnes asadas nomas")
                  done()
                  requester.close()
                })
            })
        })
    })
  })
})
