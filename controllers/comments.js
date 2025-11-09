const mongoose = require('mongoose');
const Comment = require('../models/comment');

exports.comment_index_get = (req,res) => {
  res.render('comments/commentCreate.ejs')
}
