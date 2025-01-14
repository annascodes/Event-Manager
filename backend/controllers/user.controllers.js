import User from "../models/user.model.js";
import { errHandler } from "../utils/err.js"

export const searchedUser = async(req, res,next)=>{
    console.log('searchedUser',req.params.searchedTerm)

    // if(!req.body.searchTerm || req.body.searchTerm == '' || req.body.searchTerm == ' ')
    //     return next(errHandler(400, 'write something in input'))
    const searchTerm = req.body.searchedTerm
    try {
        const users = await User.find({
            $or: [
              { firstName: { $regex: searchTerm, $options: 'i' } }, // Search in firstname
              { lastName: { $regex: searchTerm, $options: 'i' } },  // Search in lastname
              { email: { $regex: searchTerm, $options: 'i' } },     // Search in email
            ],
          }).select('-password').populate([
            {
              path: 'receivedInv',
              populate:{
                path: 'event',
                select:['name']

              }

            }
          ])
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
} 

export const profile = async(req, res, next)=>{
    if(!req.body.id) return next(errHandler(400, 'no id was given'))
  try {
      const user = await User.findOne({_id:req.body.id})
      res.status(200).json(user)
    
  } catch (error) {
    next(error)
  }
}