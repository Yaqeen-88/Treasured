const express = require('express')
const profileCTRL = require('../controllers/profile')
const router = require("express").Router()

router.get('/:userID', profileCTRL.profile_index_get)
router.get('/:userID/edit', profileCTRL.profile_edit_get)

module.exports = router
