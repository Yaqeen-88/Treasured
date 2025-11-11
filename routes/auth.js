const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

router.get('/sign-up', authController.auth_signup_get)
router.post('/sign-up', authController.auth_signup_post)

router.get("/sign-in", authController.auth_signin_get)
router.post("/sign-in", authController.auth_signin_post)

router.get("/sign-out", authController.auth_signout)

module.exports = router