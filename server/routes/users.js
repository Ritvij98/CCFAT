const express = require('express')
const {
  signUp,
  signIn,
  signJWTForUser
} = require('../auth')


const router = new express.Router()

router.post('/signup', signUp, signJWTForUser)

router.post('/login', signIn, signJWTForUser)

module.exports = router