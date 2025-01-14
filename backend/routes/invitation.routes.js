import express from 'express'
import { verifyToken } from '../utils/verifyToken.js';
import { deleteInv, postResponse, received, sendInvitation, sentByMe } from '../controllers/invitation.controllers.js';

const route = express.Router();

route.post('/sendinvitation', verifyToken, sendInvitation)
route.get('/sentbyme', verifyToken, sentByMe)
route.get('/received', verifyToken, received)
route.post('/postresponse', verifyToken, postResponse)
route.post('/deleteinv', verifyToken, deleteInv)

export default route;