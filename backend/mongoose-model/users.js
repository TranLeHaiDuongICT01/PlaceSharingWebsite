const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a valid name']
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ]
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: 6
    },
    image: {
        type: String,
        required: [true, 'Please enter a valid image']
    },
    places: {
        type: [mongoose.Types.ObjectId],
        ref: 'Places',
        required: true
    }
})
module.exports = mongoose.model('Users', userSchema)