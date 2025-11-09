const express = require('express')
const router = express.Router()

const bcrypt = require("bcrypt")
const User = require('../models/user.js')

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.post('/sign-up', async (req, res) => {
    const userInDatabase = await User.findOne({username: req.body.username})
    if (userInDatabase) {
        return res.send('username already taken.')
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Password and Confirm Password must match')
    }

    const hashedPassowrd = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassowrd

    const user = await User.create(req.body)
    res.send(`thanks for signing up ${user.username}`)

    res.send('Form submission accepted')
})

module.exports = router