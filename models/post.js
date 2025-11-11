const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    enum: ['Songs', 'Movies', 'Pets', 'Moment', 'Food','Quote', 'shows'],
    required: true,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

