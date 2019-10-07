// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../app')
const expect = chai.expect


chai.use(chaiHttp)

describe('Config', () => {
  describe('/POST Config', () => {
    it('should return a succesful json response', (done) => {
      chai.request(server)
        .post('/config')
        .send({ slack_job: 'off' })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.deep.equal({ message: 'Success action' })
          done()
        })
    })
  })
})
