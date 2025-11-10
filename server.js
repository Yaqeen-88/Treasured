const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");


const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments")

const { connected } = require("process");


const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`connected to mongodb ${mongoose.connection.name}.`)
})

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"));
app.use(morgan("dev"));


app.get('/', async (req,res) => {
  res.render('index.ejs')
})

app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.use("/posts", postRouter);
app.use("/posts/:postID/comments", commentRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
