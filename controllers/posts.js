const mongoose = require("mongoose")
const Post = require("../models/post")
// for uploading images using multer
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Show all posts
exports.post_index_get = async (req, res) => {
  const posts = await Post.find()
  res.render("posts/index.ejs", { posts })
}

// Add post
exports.post_create_get = async (req, res) => {
  res.render("posts/new.ejs")
}

// Create a new post for image
exports.post_create_post = [
  upload.single("image"), // handles the uploaded file
  async (req, res) => {
    let imageBase64 = null
    if (req.file) {
      imageBase64 = req.file.buffer.toString("base64")
    }
    await Post.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category.toLowerCase(),
      image: imageBase64,
      creator: req.session.user._id,
    })
    res.redirect("/posts")
  },
];




// Show post
exports.post_show_get = async (req, res) => {
  const post = await Post.findById(req.params.postId).populate("creator")
  const userHasLiked = post.likedBy.some((user) =>
    user.equals(req.session.user._id)
  )
  res.render("posts/show.ejs", { post, userHasLiked })
}

// Edit post
exports.post_edit_get = async (req, res) => {
  const currentPost = await Post.findById(req.params.postId)
  res.render("posts/edit.ejs", { post: currentPost })
}

// Update the post
exports.post_update_put = async (req, res) => {
  const currentPost = await Post.findById(req.params.postId)
  if (currentPost.creator.equals(req.session.user._id)) {
    await currentPost.updateOne(req.body)
    res.redirect("/posts")
  } else {
    res.send("You can't do that silly :)")
  }
}

// Delete post
exports.post_delete_delete = async (req, res) => {
  const post = await Post.findById(req.params.postId)
  if (post.creator.equals(req.session.user._id)) {
    await post.deleteOne()
    res.redirect("/posts")
  } else {
    res.send("You can't do that silly :)")
  }
}

// Adding like
exports.like_create_post = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.postId, {
    $push: { likedBy: req.params.userId },
  })
  res.redirect(`/posts/${req.params.postId}`)
}

// Removing like
exports.like_delete_delete = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.postId, {
    $pull: { likedBy: req.params.userId },
  })
  res.redirect(`/posts/${req.params.postId}`)
}
