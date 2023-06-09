const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const routeBlog = require('./routes/blog')
const authRoute = require("./routes/auth")



const app = express()

// connect cloud database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    return console.log('เชื่อมต่อเรียบร้อย')
}).catch((err) => {
    return console.log(err)
})

// middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// route
app.use('/api',routeBlog)
app.use ('/api',authRoute)

const port = process.env.PORT || 8080
app.listen(port,() => console.log(`start server in port ${port}`))