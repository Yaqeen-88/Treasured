const commentCTRL = require('../controllers/comments')
const router = require('express').Router()

router.get('/', commentCTRL.comment_index_get)
router.get('/new', commentCTRL.comment_new_get)
router.post('/', commentCTRL.comment_new_post)
router.delete('/:commentID', commentCTRL.comment_delete)

module.exports = router
