import User from "../models/user.model.js"
import { errHandler } from "../utils/err.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const resgistration = async (req, res, next) => {

    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) return next(errHandler(404, 'need all credentials'))

        const isExist = await User.findOne({ email: req.body.email }) 

        if (isExist) return next(errHandler(400, 'email already registered!'))
        const password = bcryptjs.hashSync(req.body.password, 10);

        const newUser = new User(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password,
            }
        )
        await newUser.save()

        if (newUser) {
            const { password, ...rest } = newUser._doc;
            res.status(200).json(rest)
        }

    } catch (error) {
        next(error)
    }

}

export const login = async (req, res, next) => {
    if (!req.body.email || !req.body.password)
        return next(errHandler(400, 'both email and password needed'))

    try {
        const isExist = await User.findOne({ email: req.body.email })
        if (!isExist) return next(errHandler(404, 'user not found'))

        const validatingPass = bcryptjs.compare(req.body.password, isExist.password)
        if (!validatingPass) return next(errHandler(400, 'wrong password'))

        const token = jwt.sign({ id: isExist._id }, process.env.jwt_key)
        res.cookie('access_token', token, { httpOnly: true })

        const {password:pass, ...rest} = isExist._doc;
        res.status(200).json(rest)


    } catch (error) {
        next(error)
    }
}

export const logout = async(req, res, next)=>{
    console.log('logging out')
    try {
        res.clearCookie("access_token").status(200).json('logged out successfully')
    } catch (error) {
        next(error)
    }

}