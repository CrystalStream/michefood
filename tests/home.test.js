// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const server = require('../app')
const expect = chai.expect


chai.use(chaiHttp)

describe('Home', () => {
  describe('/GET Home', () => {
    it('should render the correct landing page', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          const template = fs.readFileSync(path.join(__dirname, '../', 'views/home/index.ejs'), 'utf-8')
          const html = ejs.render(template, {})

          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.text).to.be.equal(html)
          done()
        })
    })
  })
})
