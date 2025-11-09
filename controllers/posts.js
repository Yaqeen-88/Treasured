const mongoose = require('mongoose');
const Post = require('../models/post');
// for uploading images using multer
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });



// Show all posts
exports.post_index_get = async (req, res) => {
  const posts = await Post.find();
  res.render('posts/index.ejs', { posts });
};

// Show post 
exports.post_create_get = async (req, res) => {
  res.render('posts/new.ejs');
};

// Create a new post for image
exports.post_create_post = [
  upload.single('image'), // handles the uploaded file
  async (req, res) => {
      let imageBase64 = null;
      if (req.file) {
        imageBase64 = req.file.buffer.toString('base64');
      }
      await Post.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: imageBase64,
        userId: req.session?.user?._id || new mongoose.Types.ObjectId(),
      });
      res.redirect('/posts');
    
  }
];
