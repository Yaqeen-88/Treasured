const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")

app.use(express.json())

// Middleware
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")
const passUserToView = require("./middleware/pass-user-to-view")
const isSignedIn = require("./middleware/is-signed-in")
const MongoStore = require("connect-mongo")
const authRouter = require("./routes/auth.js")

const postRouter = require("./routes/posts")
const commentRouter = require("./routes/comments")
const profileRouter = require('./routes/profiles.js')

const { connected } = require("process")

const port = process.env.PORT || 3000




mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`connected to mongoDB ${mongoose.connection.name}.`)
})

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))

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

app.use(passUserToView)


app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.use("/auth", authRouter)

app.use("/posts/:postID/comments", commentRouter)
app.use("/posts", isSignedIn, postRouter)
app.use('/users/profile', isSignedIn, profileRouter)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
