const commentCTRL = require("../controllers/comments")
const router = require("express").Router({ mergeParams: true })

router.post("/", commentCTRL.comment_new_post)
router.delete("/:commentID", commentCTRL.comment_delete)

module.exports = router
