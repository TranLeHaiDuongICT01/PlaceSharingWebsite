const mongoose = require('mongoose')

const placeSChema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a valid title']
    },
    des: {
        type: String,
        required: [true, 'Please enter a valid des']
    },
    image: {
        type: String,
        required: [true, 'Please enter a valid image']
    },
    address: {
        type: String,
        required: [true, 'Please enter a valid address']
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

module.exports = mongoose.model('Places', placeSChema)