const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', ()=> {
    console.log(`Database connected to mangodb ${process.env.MONGODB_URI}`)
})
