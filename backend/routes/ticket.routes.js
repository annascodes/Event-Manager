import express from 'express'
import { verifyToken } from '../utils/verifyToken.js';
import { createTicket, getMyTickets } from '../controllers/ticket.controllers.js';

const route = express.Router();

route.post('/createticket', verifyToken, createTicket )
route.get('/getmytickets', verifyToken, getMyTickets)



export default route