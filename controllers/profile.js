const Post = require("../models/post")
const User = require("../models/user")

exports.profile_index_get = async (req, res) => {
  const userProfile = await User.findById(req.params.userID)
  const myPostsOG = await Post.find({ creator: req.params.userID }).populate("creator")
  const postCount = myPostsOG.length
  const myPosts = myPostsOG.toReversed()
  if (!userProfile.avatar) {
    userProfile.avatar = "/Assets/Images/default-avatar.png"
  }else {
    userProfile.avatar = `data:image/jpeg;base64${userProfile.avatar}`
  }
  res.render("profile/index.ejs", { myPosts, postCount, userProfile })
}

exports.profile_edit_get = async (req, res) => {
  const account = await User.findById(req.params.userID)
  res.render("profile/edit.ejs", { account })
}

exports.profile_edit_put = async (req, res) => {
  let imageBase64 = User.avatar
  if (req.file) {
    imageBase64 = req.file.buffer.toString("base64")
  }
  req.body.avatar = imageBase64
  await User.findByIdAndUpdate(req.params.userID, req.body)
  res.redirect(`/users/profile/${req.params.userID}`)
}
