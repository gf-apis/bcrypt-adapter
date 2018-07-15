'use strict'

const {PasswordAdapter} = require('@gf-apis/core/adapters/PasswordAdapter')
const Bcrypt = require('bcrypt')

class BcryptAdapter extends PasswordAdapter {
  validate (req, res, hash, plain, callback) {
    Bcrypt
      .compare(plain, hash)
      .then(valid => {
        callback(null, req, res, false)
      })
      .catch(err => {
        callback(err, req, res, false)
      })
  }

  generate (req, res, plain, callback) {
    Bcrypt
      .hash(plain)
      .then(hash => {
        callback(null, req, res, hash)
      })
      .catch(err => {
        callback(err, req, res, null)
      })
  }
}

module.exports = BcryptAdapter
