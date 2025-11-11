
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");

app.use(express.json())

// Middleware
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');
const passUserToView = require('./middleware/pass-user-to-view');
const isSignedIn = require('./middleware/is-signed-in');


const postRouter = require("./routes/posts");
const { connected } = require("process");


const port = process.env.PORT || 3000;

const authController = require('./controllers/auth.js')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`connected to mongoDB ${mongoose.connection.name}.`)
})

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passUserToView);

app.get('/', async (req,res) => {
  res.render('index.ejs', {
    user: req.session.user,
  })
})

app.use('/auth', authController)

app.get("/", (req, res) => {
  res.redirect("/posts");

})

app.use(isSignedIn)
app.use("/posts", postRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
