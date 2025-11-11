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
    res.redirect('sign-in')

})

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs')
})

router.post('/sign-in', async (req, res) => {
    const userInDatabase = await User.findOne({username: req.body.username})
    if (!userInDatabase) {
    return res.send('Login failed, Please try again.')
}

const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
)
if (!validPassword) {
    return res.send('Login failed, Please try again.')
}

req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id
}

res.redirect('/posts')
})

router.get('/sign-out', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router