'use strict'

const {PasswordAdapter} = require('@gfa/core/adapters/PasswordAdapter')
const Bcrypt = require('bcrypt')

class BcryptAdapter extends PasswordAdapter {
  constructor (opts) {
    var options = opts || {}
    super(options)
    this.rounds = options.rounds || 8
  }

  validate (req, res, hash, plain, callback) {
    Bcrypt
      .compare(plain, hash)
      .then(valid => {
        callback(null, req, res, valid)
      })
      .catch(err => {
        callback(err, req, res, false)
      })
  }

  generate (req, res, plain, callback) {
    Bcrypt
      .hash(plain, this.rounds)
      .then(hash => {
        callback(null, req, res, hash)
      })
      .catch(err => {
        callback(err, req, res, null)
      })
  }
}

module.exports = BcryptAdapter
