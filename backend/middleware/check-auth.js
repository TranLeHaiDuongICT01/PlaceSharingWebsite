const jwt = require('jsonwebtoken')
const CustomError = require('../Errors/CustomError')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return next(new CustomError('You do not login yet', 401))
        }
        const payLoad = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payLoad.userId, email: payLoad.email }
        next()
    } catch (error) {
        return next(new CustomError('You do not login yet', 401))
    }
}