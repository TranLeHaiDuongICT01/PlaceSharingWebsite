const Places = require('../mongoose-model/places')
const CustomError = require('../Errors/CustomError')
const { StatusCodes } = require('http-status-codes')
const Users = require('../mongoose-model/users')
const mongoose = require('mongoose')
const fs = require('fs')


const getAllPlace = async (req, res, next) => {
    try {
        const places = await Places.find({})
        res.status(StatusCodes.OK).json({ places })
    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const createPlace = async (req, res, next) => {
    const { title, des, address } = req.body
    const { userId } = req.user
    try {

        let createUser = await Users.findById(userId).populate('places')

        if (!createUser || createUser.length === 0) {
            return next(new CustomError(`User with id ${userId} not found`, StatusCodes.NOT_FOUND))
        }
        const pathLink = String(req.file.path).replace(/\\/gim, '/')

        const session = await mongoose.startSession()
        session.startTransaction()
        const place = new Places({ title, des, image: pathLink, address, creator: userId })
        await place.save({ session: session })
        createUser.places.push(place)
        await createUser.save({ session: session })
        await session.commitTransaction()


        return res.status(StatusCodes.CREATED).json({ place })
    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const getPlaceById = async (req, res, next) => {
    const { placeId } = req.params
    try {
        const place = await Places.findById(placeId)

        if (!place || place.length === 0) {
            return next(new CustomError(`Place with id ${placeId} not found`, StatusCodes.NOT_FOUND))
        }
        return res.status(StatusCodes.OK).json({ place })
    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const getPlacesByCreator = async (req, res, next) => {
    const { userId } = req.params
    try {
        const places = await Places.find({ creator: userId })
        res.status(StatusCodes.OK).json({ places })
    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const updatePlace = async (req, res, next) => {
    const { placeId } = req.params
    const { title, des, address } = req.body
    try {
        const findPlace = await Places.findById(placeId)
        if (!findPlace || findPlace.length === 0) {
            return next(new CustomError(`Place with id ${placeId} not found`, StatusCodes.NOT_FOUND))
        }

        if (req.user.userId.toString() !== findPlace.creator.toString()) {
            return next(new CustomError(`You are not allowed to update this place`, StatusCodes.UNAUTHORIZED))
        }

        const place = await Places.findByIdAndUpdate(placeId, { title, des, address }, { new: true, runValidators: true })
        res.status(StatusCodes.OK).json({ place })

    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const deletePlace = async (req, res, next) => {
    const { placeId } = req.params
    try {
        const findPlace = await Places.findById(placeId).populate('creator')
        if (!findPlace || findPlace.length === 0) {
            return next(new CustomError(`Place with id ${placeId} not found`, StatusCodes.NOT_FOUND))
        }

        if (req.user.userId.toString() !== findPlace.creator._id.toString()) {
            return next(new CustomError(`You are not allowed to update this place`, StatusCodes.UNAUTHORIZED))
        }
        const imagePath = findPlace.image

        const session = await mongoose.startSession()
        session.startTransaction()
        await findPlace.remove({ session: session })
        findPlace.creator.places.pull(findPlace)
        await findPlace.creator.save({ session: session })
        await session.commitTransaction()

        fs.unlink(imagePath, err => {
            console.log(err);
        })

        res.status(StatusCodes.OK).json({ msg: 'Delete successfully' })

    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

module.exports = {
    getAllPlace,
    createPlace,
    getPlaceById,
    getPlacesByCreator,
    updatePlace,
    deletePlace
}