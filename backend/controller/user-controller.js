const Places = require('../mongoose-model/places')
const CustomError = require('../Errors/CustomError')
const { StatusCodes } = require('http-status-codes')
const Users = require('../mongoose-model/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { update } = require('../mongoose-model/places')

const getAllUser = async (req, res, next) => {
    try {
        const users = await Users.find({})
        res.status(StatusCodes.OK).json({ users })
    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const getUserById = async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await Users.findById(userId)
        if (!user || user.length === 0) {
            return next(new CustomError(`Cannot find user with id ${userId}`, StatusCodes.NOT_FOUND))
        }
        res.status(StatusCodes.OK).json({ user })
    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const signUp = async (req, res, next) => {
    const { name, email, password } = req.body
    try {

        const findUser = await Users.find({ email: email })
        if (findUser && findUser.length > 0) {
            return next(new CustomError('The email already exists!', StatusCodes.BAD_REQUEST))
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const pathLink = String(req.file.path).replace(/\\/gim, '/')

        const user = await Users.create({ name, email, password: hashedPassword, image: pathLink })

        const token = jwt.sign({ userId: user.id, userName: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(StatusCodes.CREATED).json({ userId: user.id, email, token })
    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await Users.findOne({ email })
        if (!user || user.length === 0) {
            return next(new CustomError('This email is not signed up, please sign up or login again', StatusCodes.NOT_FOUND))
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return next(new CustomError('Wrong password', StatusCodes.UNAUTHORIZED))
        }

        const token = jwt.sign({ userId: user.id, userName: user, email: email }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(StatusCodes.OK).json({ userId: user.id, email, token })
    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const updateUser = async (req, res, next) => {
    const { userId } = req.params
    const { name, email, password } = req.body
    try {
        const user = await Users.findById(userId)
        if (!user || user.length === 0) {
            return next(new CustomError(`Cannot find user with id ${userId}`, StatusCodes.NOT_FOUND))
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        user.name = name
        user.email = email
        user.password = hashedPassword
        await user.save()

        const token = jwt.sign({ userId: user.id, userName: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(StatusCodes.OK).json({ userId: user.id, email, token })
    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const deleteUser = async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await Users.findById(userId).populate('places')
        if (!user || user.length === 0) {
            return next(new CustomError(`Cannot find user with id ${userId}`, StatusCodes.NOT_FOUND))
        }

        const imagePath = user.image

        const sess = await mongoose.startSession()
        sess.startTransaction()
        // const removePlaces = user.places
        for (let i = 0; i < user.places.length; i++) {
            const place = await Places.findByIdAndDelete(user.places[i]._id)
            console.log(place);
        }

        await user.remove({ session: sess })
        await sess.commitTransaction()

        fs.unlink(imagePath, err => {
            console.log(err);
        })

        res.status(StatusCodes.OK).json({ msg: "Delete success", user })
    } catch (error) {
        return next(new CustomError('Something went wrong, please try again!', StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

module.exports = {
    getAllUser,
    signUp,
    login,
    deleteUser,
    getUserById,
    updateUser
}