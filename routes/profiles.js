const express = require('express')
const profileCTRL = require('../controllers/profile')
const { route } = require('./auth')
const router = require("express").Router()
const multer = require('multer')
const upload = multer()

router.get('/:userID', profileCTRL.profile_index_get)
router.get('/:userID/edit', profileCTRL.profile_edit_get)

router.post('/:userID', upload.single('avatar'), profileCTRL.profile_edit_post)
module.exports = router
