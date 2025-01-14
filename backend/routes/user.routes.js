import express from 'express'
import { profile, searchedUser } from '../controllers/user.controllers.js';

const route = express.Router();

route.post('/searchedusers', searchedUser)
route.post('/profile', profile)


export default route;