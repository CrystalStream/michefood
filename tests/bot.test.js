// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiNock = require('chai-nock')

const testHelper = require('./test-helper')
const server = require('../app')
const expect = chai.expect

chai.use(chaiHttp)
chai.use(chaiNock)

describe('Bot', () => {
  before(async () => {
    // Start and seed the db
    await testHelper.startDB()
  })

  after(async () => {
    // Stop and clear the db
    await testHelper.stopDB()
  })

  describe('/POST Bot', () => {
    describe('Slack server validation', () => {
      it('should response with the challenge parameter', (done) => {
        chai.request(server)
          .post('/api/bot')
          .send({ challenge: '1234challenge' })
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.deep.equal({ challenge: '1234challenge' })
            done()
          })
      })
    })

    describe('Slack bot responses', () => {
      it('should respond with a 200 status only when subtype parameter is on the request', (done) => {
        const slackMessageApiMock = testHelper.mockSlackInternalRequest('get')

        chai.request(server)
          .post('/api/bot')
          .send({ event: { subtype: 're_send' }})
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(slackMessageApiMock).to.not.have.been.requested
            done()
          })
      })

      it('should respond with a 200 status only when type parameter is different "message"', (done) => {
        const slackMessageApiMock = testHelper.mockSlackInternalRequest('get')

        chai.request(server)
          .post('/api/bot')
          .send({ event: { type: 'bot_response' }})
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(slackMessageApiMock).to.not.have.been.requested
            done()
          })
      })
    })

    describe('Slack bot not enough info', () => {
      it('should response with a message publish to the channel', (done) => {
        const slackMessageApiMock = testHelper.mockSlackInternalRequest('post')

        chai.request(server)
          .post('/api/bot')
          .send({ event: {
              type: 'message',
              text: 'add',
              channel: 'EG2234GW'
            }
          })
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(slackMessageApiMock).to.have.been.requested
            done()
          })
      })
    })

    describe('Slack bot trying add a place with invalid url', () => {
      it('Should not add a place and send a message to slack', (done) => {
        const requester = chai.request(server).keepOpen()
        const slackMessageApiMock = testHelper.mockSlackInternalRequest('post')

        requester
          .post('/api/bot')
          .send({ event: {
              type: 'message',
              text: 'add https://google.com/',
              channel: 'EG2234GW'
            }
          })
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(slackMessageApiMock).to.have.been.requested
            requester
              .get('/api/places')
              .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.lengthOf(10)
                done()
                requester.close()
              })
          })
      })
    })

    describe('Slack bot add a place from facebook url', () => {
      it('Should add a place and send a message to slack', (done) => {
        const slackMessageApiMock = testHelper.mockSlackInternalRequest('post')
        const fbMock = testHelper.mockFbPlaceInternalRequest()
        const fbIDMock = testHelper.mockFbIDInternalRequest()

        chai.request(server)
          .post('/api/bot')
          .send({ event: {
              type: 'message',
              text: 'add https://www.facebook.com/Lasglorias.delacocina',
              channel: 'EG2234GW'
            }
          })
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(fbIDMock).to.have.been.requested
            expect(fbMock).to.have.been.requested
            expect(slackMessageApiMock).to.have.been.requested
            done()
          })
      })

      it('should show the newly place on the db', (done) =>{
        chai.request(server)
          .get('/api/places')
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.length(11)
            done()
          })
      })
    })

    describe('Slack bot wrong option', () => {
      it('should send a message with the valid options and not add any place', (done) => {
        const slackMessageApiMock = testHelper.mockSlackInternalRequest('post')
        const fbIDMock = testHelper.mockFbIDInternalRequest()

        chai.request(server)
          .post('/api/bot')
          .send({ event: {
              type: 'message',
              text: 'agregar https://www.facebook.com/Lasglorias.delacocina',
              channel: 'EG2234GW'
            }
          })
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(slackMessageApiMock).to.have.been.requested
            expect(fbIDMock).to.not.have.been.requested
            done()
          })
      })
    })

  })
})
