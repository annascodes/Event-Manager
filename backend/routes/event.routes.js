import express from 'express'
import { verifyToken } from '../utils/verifyToken.js';
import { addInGallery, createEvent, createSingleEvent, deleteEvent, editevent, eventDetails, eventsByMe, getGallery, getPublicEvents, getSavedEvents, saveEvent, searchEvent, userProfileData } from '../controllers/event.controlles.js';

const route = express.Router();

route.post('/createevent', verifyToken, createEvent)
route.get('/getpublicevents', getPublicEvents )
route.post('/createsingleevent', verifyToken, createSingleEvent)
route.delete('/deleteevent/:id', verifyToken, deleteEvent)
route.get('/eventsbyme', verifyToken, eventsByMe)
route.get('/eventdetails/:id', verifyToken, eventDetails)
route.post('/userprofiledata', verifyToken, userProfileData)
route.post('/addingallery', verifyToken, addInGallery)
route.get('/getgallery', verifyToken, getGallery)
route.post('/editevent', verifyToken, editevent)
route.post('/searchevent', verifyToken, searchEvent)
route.post('/saveevent', verifyToken, saveEvent)
route.get('/getsavedevents', verifyToken, getSavedEvents)

export default route;