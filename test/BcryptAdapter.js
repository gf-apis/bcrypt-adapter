'use strict'

const expect = require('chai').expect
const BcryptAdapter = require('../')

describe('BcryptAdapter', function () {
  let adapter = new BcryptAdapter()

  describe('#constructor', function () {
    it('initializes with default options', function () {
      expect(adapter.rounds).to.equal(8)
    })

    it('initializes with given options', function () {
      let adapter2 = new BcryptAdapter({rounds: 10})
      expect(adapter2.rounds).to.equal(10)
    })
  })

  describe('#validate', function () {
    it('accepts valid passwords', function (done) {
      let callback = (err, _req, _res, valid) => {
        expect(valid).to.be.true()
        done(err)
      }
      let plain = 'abc123'
      adapter.generate(null, null, plain, (err, _req, _res, hash) => {
        if (err) return done(err)
        adapter.validate(null, null, hash, plain, callback)
      })
    })

    it('refuses invalid passwords', function (done) {
      let callback = (err, _req, _res, valid) => {
        expect(valid).to.be.false()
        done(err)
      }
      let plain = 'abc123'
      let invalid = '123abc'
      adapter.generate(null, null, plain, (err, _req, _res, hash) => {
        if (err) return done(err)
        adapter.validate(null, null, hash, invalid, callback)
      })
    })
  })
})
