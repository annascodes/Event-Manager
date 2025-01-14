import { response } from 'express'
import { allEvents, eventPrices, eventStatus, imgUrls } from '../constants/event.js'
import Event from '../models/event.model.js'
import Gallery from '../models/gallery.model.js'
import Invitation from '../models/invitation.model.js'
import Ticket from '../models/ticket.model.js'
import { errHandler } from '../utils/err.js'
import { v2 as cloudinary } from 'cloudinary'
import User from '../models/user.model.js'

export const createEvent = async (req, res, next) => {
    try {
        for (let i = 0; i < allEvents.length; i++) {
            const event = new Event(
                {
                    name: allEvents[i].name,
                    desc: allEvents[i].description,
                    createdBy: req.user.id,
                    registrationEndDate: '2024-01-02',
                    timeStart: '13:00',
                    timeEnd: '17:00',
                    venue: allEvents[i].venue,
                    isPublic: i % 2 === 0 ? true : false,
                    capacity: i % 2 === 0 ? 100 : 70,
                    price: eventPrices[Math.floor(Math.random() * eventPrices.length)],
                    status: eventStatus[Math.floor(Math.random() * eventStatus.length)],
                    imgs: [imgUrls[Math.floor(Math.random() * imgUrls.length)]],
                    city: allEvents[i].city,

                }
            )

            if (event) await event.save()
        }

        res.status(200).json('ok')
    } catch (error) {
        next(error)
    }


}

export const getPublicEvents = async (req, res, next) => {

    try {
        const publicEvents = await Event.find({ isPublic: true }).populate(
            [
                {
                    path: 'createdBy',
                    select: ['firstName', 'lastName', 'email']
                }
            ]
        ).sort({ createdAt: -1 })

        res.status(200).json(publicEvents)

    } catch (error) {
        next(error)
    }
}

export const createSingleEvent = async (req, res, next) => {

    try {
        let imgsSecureUrl = []
        if (req.body.imgs.length !== 0) {
            for (let i = 0; i < req.body.imgs.length; i++) {
                const uploadingImg = await cloudinary.uploader.upload(req.body.imgs[i])
                imgsSecureUrl.push(uploadingImg.secure_url)
            }
        }
        const event = new Event(
            {
                imgs: imgsSecureUrl,
                name: req.body.name,
                desc: req.body.desc,
                createdBy: req.user.id,
                registrationEndDate: req.body.registrationEndDate,
                timeStart: req.body.timeStart,
                timeEnd: req.body.timeEnd,
                venue: req.body.venue,
                isPublic: req.body.isPublic,
                capacity: req.body.capacity,
                price: req.body.price,
                status: req.body.status,
                city: req.body.city,

            }
        )

        await event.save()
        res.status(200).json(event)

    } catch (error) {
        next(error)
    }
}

export const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return next(errHandler(404, 'event not found.'))

        if (event.createdBy.toString() !== req.user.id) {
            console.log(event.createdBy.toString())
            console.log(req.user.id)
            return next(errHandler(401, 'not authorized to perform this action.'))

        }

        if (event.imgs.length !== 0) {
            for (let i = 0; i < event.imgs.length; i++) {
                await cloudinary.uploader.destroy(event.imgs[i].split('/').pop().split('.')[0])
            }
        }
        await Event.findByIdAndDelete(req.params.id)

        res.status(200).json({ event, msg: 'event deleted successfully' })

    } catch (error) {
        next(error)
    }
}

export const eventsByMe = async (req, res, next) => {
    if (!req.user.id) return next(errHandler(401, 'bad authorization'))

    try {
        const eventsbyme_ = await Event.find({ createdBy: req.user.id }).populate(
            [
                {
                    path: 'createdBy',
                    select: ['email']
                }
            ]
        ).sort({ createdAt: -1 })

        res.status(200).json(eventsbyme_)

    } catch (error) {
        next(error)
    }

}

export const eventDetails = async (req, res, next) => {
    try {
        let visitors = [
            // {
            //     email: '',
            //     response: '',
            //     responseDate: '',
            //     ticketNo:'',
            //     ticketPurchaseOn: '',
            //     comingAs: '' 
            // }
        ]
        const event = await Event.findById(req.params.id).populate(
            [
                {
                    path: 'createdBy',
                    select: ['firstName', 'lastName', 'email ']
                }
            ]
        )
        const invitedPeople = await Invitation.find({ event: req.params.id }).populate(
            [
                {
                    path: 'sendTo',
                    select: ['firstName', 'lastName', 'email']
                }
            ]
        )
        invitedPeople.map((i, indx) => {
            visitors.push(
                {
                    userId: i.sendTo._id,
                    email: i.sendTo.email,
                    response: i.response,
                    responseDate: i.responseDate ? i.responseDate : null,
                    ticketNo: null,
                    ticketPurchaseOn: null,
                    comingAs: i.role
                }
            )
        })
        const eventTickets = await Ticket.find({ event: event._id }).populate(
            [
                {
                    path: 'owner',
                    select: ['email']
                }
            ]
        )
        eventTickets.map((t,indx)=>{
            visitors.push(
                {
                    userId: t.owner._id,
                    email: t.owner.email,
                    response: null,
                    responseDate: null,
                    ticketNo: t._id,
                    ticketPurchaseOn: t.paidDate,
                    comingAs: 'guest'
                }
            )
        })








        res.status(200).json({ event, invitedPeople:visitors })
        // res.status(200).json(visitors)
    } catch (error) {
        next(error)
    }
}

export const userProfileData = async (req, res, next) => {
    if (!req.body?.id) return next(errHandler(400, 'no id was given'))
    try {
        const events = await Event.find({ createdBy: req.body.id }).populate(
            [
                {
                    path: 'createdBy',
                    select: ['firstName', 'lastName']
                }
            ]
        )
        const invs = await Invitation.find({ sendBy: req.user.id, sendTo: req.body.id }).populate(
            [
                {
                    path: 'event',
                    select: ['name']
                },
                {
                    path: 'sendTo',
                    select: ['email']
                },
                {
                    path: 'sendBy',
                    select: ['email']
                }
            ]
        )

        res.status(200).json({ events, invs })


    } catch (error) {
        next(error)
    }
}

export const addInGallery = async (req, res, next) => {
    console.log(req.body)
    if (req.body.imgs.length === 0) return next(errHandler(400, 'no images to upload'))

    let imgSecureUrls = []

    for (let i = 0; i < req.body.imgs.length; i++) {
        let imgRes = await cloudinary.uploader.upload(req.body.imgs[i])
        imgSecureUrls.push(imgRes.secure_url)
    }

    try {
        const galllery = new Gallery({
            imgs: imgSecureUrls,
            by: req.user.id,
        })

        await galllery.save()
        res.status(200).json(galllery)

    } catch (error) {
        next(error)
    }

}

export const getGallery = async (req, res, next) => {
    try {
        const gallery = await Gallery.find().populate(
            [
                {
                    path: 'by',
                    select: ['firstName', 'lastName']
                }
            ]
        )
        res.status(200).json(gallery)

    } catch (error) {
        next(error)
    }
}

export const editevent = async (req, res, next) => {
    try {

        if (!req.user.id) return next(errHandler(404, 'logout and sign-in again'))

        const event = await Event.findById(req.body.id)
        if (!event) return next(errHandler(404, 'no event found to edit'))

        if (event.createdBy.toString() !== req.user.id)
            return next(errHandler(401, 'not authorized to edit this event'))


        let newImgs = [...event.imgs]

        if (req.body.removeImgs.length > 0) {
            for (let x = 0; x < req.body.removeImgs.length; x++) {
                await cloudinary.uploader.destroy(req.body.removeImgs[x].split('/').pop().split('.')[0])
            }

            newImgs = newImgs.filter((img, indx) => img !== req.body.removeImgs[indx])
        }

        if (req.body.imgs.length > 0) {
            for (let i = 0; i < req.body.imgs.length; i++) {
                let newimg = await cloudinary.uploader.upload(req.body.imgs[i])
                newImgs.push(newimg.secure_url)
            }
        }

        const updatingEvent = await Event.findByIdAndUpdate(req.body.id,
            {
                $set: {
                    imgs: newImgs,
                    name: req.body.name,
                    desc: req.body.desc,
                    createdBy: req.user.id,
                    registrationEndDate: req.body.registrationEndDate,
                    timeStart: req.body.timeStart,
                    timeEnd: req.body.timeEnd,
                    venue: req.body.venue,
                    isPublic: req.body.isPublic,
                    capacity: req.body.capacity,
                    price: req.body.price,
                    status: req.body.status,
                    city: req.body.city,

                }
            }, { new: true }
        )

        res.status(200).json(updatingEvent)
    } catch (error) {

    }

}

export const searchEvent = async (req, res, next) => {
    try {
        const searchResult = await Event.find(
            {
                $or: [
                    {
                        name: { $regex: req.body.searchTerm, $options: 'i' }
                    }
                ]
            }
        )

        res.status(200).json(searchResult)

    } catch (error) {
        next(error)
    }
}

export const saveEvent = async(req, res, next)=>{
    if(!req.body.eventId) return next(errHandler(404, 'no event was given to save'))
    try {
        const me = await User.findById(req.user.id)
        if(!me) return next(errHandler(400, 'bad authorization'))
        
            let updatedUser ;
            

        if(me.savedEvents.includes(req.body.eventId)){
            console.log('poping process')
            updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                {
                    $pull: {savedEvents: req.body.eventId}
                }
            )
            console.log('then pull that id')
        }else{ 
             updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                {
                    $push: {savedEvents: req.body.eventId}
                }
            )
            console.log('push that id:)')
        }

        
        const Updated = await User.findById(req.user.id)

        console.log(Updated)
        console.log(updatedUser)
        res.status(200).json(Updated)
        
    } catch (error) {
        next(error)
    }

}

export const getSavedEvents = async(req, res, next)=>{
    if(!req.user.id) return next(errHandler(400, 'login again'))
        try {
            const me = await User.findById(req.user.id)
            if(!me) return next(errHandler(404, 'user not found'))
            
            const savedEvents = await Event.find({_id:{$in:me.savedEvents}}).populate(
                [
                    {
                        path: 'createdBy',
                        select: ['firstName', 'lastName', 'email']
                    }
                ]
            ).sort({createdAt:-1})
            res.status(200).json(savedEvents)
        } catch (error) {
         next(error)   
        }

}
