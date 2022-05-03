const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const connectDB = require('./db/connectDB')
const userRoutes = require('./routes/user-routes')
const placeRoutes = require("./routes/place-routes")
const CustomError = require('./Errors/CustomError')
const path = require('path')
const fs = require('fs')
app.use(bodyParser.json())


app.use('/uploads/images', express.static(path.join('uploads', 'images')))
// app.use(express.static('./uploads/images'))

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})

app.use('/api/users', userRoutes)
app.use('/api/places', placeRoutes)

app.use((req, res, next) => {
    next(new CustomError('Cannot find this route', 404))
})

app.use((err, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        })
    }
    if (res.headerSent) {
        return next(err)
    }
    res.status(err.code || 500).json({ msg: err.message || "Something went wrong" })
})

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()