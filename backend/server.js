require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const noteRouter = require('./routes/noteRouter')
const jwt = require('express-jwt')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

//Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api/notes', require('./routes/noteRouter'))
app.use(jwt({
    secret: '109jlsjevc;a:;se;flka;elfjl;oaiunm23ijkikojhnal9o838li3rltl3apl;o2;',
    algorithms: ['HS256'],
    getToken: req=>req.cookies.token
}))
//Connect to mongoDB
const URI =  process.env.MONGODB_URL 
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to MongoDB...")
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port ', PORT)
})