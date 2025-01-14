import jwt from 'jsonwebtoken'
import { errHandler } from './err.js';


export const verifyToken = async (req, res, next) => {

    const token = req.cookies.access_token;

    if (!token) return next(errHandler(400, 'faulty token'))

    jwt.verify(token, process.env.jwt_key,
        (err, user) => {
            if (err) return next(errHandler(400, 'err in verify token '))
               
            req.user = user;
            next()
        })
}