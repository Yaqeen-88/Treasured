const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
