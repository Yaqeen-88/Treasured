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
const MongoStore = require('connect-mongo')
const authRouter = require('./routes/auth.js')


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
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)

app.use(passUserToView);



app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.use(isSignedIn)
app.use("/posts", postRouter);

app.use('/auth', authRouter)

app.get("/vip-lounge", isSignedIn, (req, res) => {
  res.send(`Welcome to the Party ${req.session.user.username}.`)
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
