const mongoose = require('mongoose');
const Comment = require('../models/comment');
const Post = require('../models/post')

exports.comment_index_get = async (req,res) => {

  // this is for temp testing until show page is created, actual is:
  // const postComments = await Comment.find({postID: req.params.postID}).populate('userID', 'postID')
  const postComments = await Comment.find({postID: '6910b77224318adbf6796315'}).populate('userID', 'postID')
  res.render('comments/show.ejs' , {postComments})
}

exports.comment_new_get = async (req,res) => {
  res.render('comments/new.ejs')
}

exports.comment_new_post = async (req,res) => {
  await Comment.create({
    description: req.body.description,
    // temp till auth is integrated
    userId: req.session?.user?._id || new mongoose.Types.ObjectId()
  })
  // temp actual is; res.redirect(`/posts/${req.params.postID}`)
  res.redirect(`/posts/6910b77224318adbf6796315`)
}

exports.comment_delete = async (req,res) => {
  Comment.deleteOne()

}
