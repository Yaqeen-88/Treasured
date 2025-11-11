const express = require('express')
const router = express.Router()

const bcrypt = require("bcrypt")
const User = require('../models/user.js')

exports.auth_signup_get = (req, res) => {
  res.render('auth/sign-up.ejs')
}

exports.auth_signup_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) return res.send('Username already taken.')

  if (req.body.password !== req.body.confirmPassword)
    return res.send('Password and Confirm Password must match.')

  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const user = await User.create(req.body)

  req.session.user = { username: user.username }
  req.session.save(() => {
    res.redirect('/')
  })
}

exports.auth_signin_get = (req, res) => {
  res.render('auth/sign-in.ejs')
}

exports.auth_signin_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (!userInDatabase) return res.send('Login failed, please try again.')

  const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)
  if (!validPassword) return res.send('Login failed, please try again.')

  req.session.user = { username: userInDatabase.username }
  req.session.save(() => {
    res.redirect('/posts')
  })
}

exports.auth_signout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}