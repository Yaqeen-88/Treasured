
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");


const postRouter = require("./routes/posts");


const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"));
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.use("/posts", postRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
