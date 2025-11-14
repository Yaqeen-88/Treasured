const mongoose = require('mongoose');
const Comment = require('../models/comment');
const Post = require('../models/post')

exports.comment_index_get = async (req,res) => {
  const postComments = await Comment.find({postID: req.params.postID}).populate('userID', 'postID')
  res.render('comments/show.ejs' , {postComments})
}

exports.comment_new_get = async (req,res) => {
  res.render('comments/new.ejs')
}

exports.comment_new_post = async (req,res) => {
  await Comment.create({
    description: req.body.description,
    userId: req.session.user._id
  })
  res.redirect(`/posts/${req.params.postID}`)
}

exports.comment_delete = async (req,res) => {
  await Comment.findByIdAndDelete(req.params.commentID)
  res.redirect(`/posts/${req.params.postId}/comments`)
}
