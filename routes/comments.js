const commentCTRL = require('../controllers/comments')
const router = require('express').Router()

router.get('/', commentCTRL.comment_index_get)
