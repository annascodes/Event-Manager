import express from 'express'
import { login, logout, resgistration } from '../controllers/auth.controllers.js';

const route = express.Router();

route.post('/register', resgistration)
route.post('/login', login)
route.post('/logout', logout)

export default route; //