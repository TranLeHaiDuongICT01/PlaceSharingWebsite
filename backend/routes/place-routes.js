const express = require('express')
const routes = express.Router()
const fileUpload = require('../middleware/file-upload')
const {
    getAllPlace,
    createPlace,
    getPlaceById,
    getPlacesByCreator,
    updatePlace,
    deletePlace
} = require('../controller/place-controller')
const checkAuth = require('../middleware/check-auth')

routes.route('/').get(getAllPlace).post(fileUpload.single('image'), checkAuth, createPlace)
routes.get('/user/:userId', getPlacesByCreator)
routes.route('/:placeId').get(getPlaceById).patch(checkAuth, updatePlace).delete(checkAuth, deletePlace)

module.exports = routes
