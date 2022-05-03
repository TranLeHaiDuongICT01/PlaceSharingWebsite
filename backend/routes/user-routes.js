const express = require('express')
const routes = express.Router()
const fileUpload = require('../middleware/file-upload')
const {
    getAllUser,
    signUp,
    login,
    deleteUser,
    getUserById,
    updateUser
} = require('../controller/user-controller')

routes.post('/login', login)
routes.post('/signup', fileUpload.single('image'), signUp)
routes.get('/', getAllUser)
routes.route('/:userId').get(getUserById).delete(deleteUser).patch(updateUser)

module.exports = routes