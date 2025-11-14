const mongoose = require("mongoose")
const Comment = require("../models/comment")
const Post = require("../models/post")

exports.comment_new_post = async (req, res) => {
  await Comment.create({
    description: req.body.description,
    userID: req.session.user._id,
    postID: req.params.postID,
  })
  res.redirect(`/posts/${req.params.postID}`)
}

exports.comment_delete = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentID)
  res.redirect(`/posts/${req.params.postID}`)
}
