import Event from "../models/event.model.js"
import Invitation from "../models/invitation.model.js"
import User from "../models/user.model.js"
import { errHandler } from "../utils/err.js"

export const sendInvitation = async (req, res, next) => {
    console.log(req.body)

    try {
        const event = await Event.findById(req.body.event._id)
        if (!event) return next(errHandler(404, 'event not found'))

        if (event.createdBy.toString() !== req.user.id) return next(errHandler(401, 'send invitation on events made by you'))

        let resData = []
        let me;
        for (let x = 0; x < req.body.usersRole.length; x++) {
            //whether we have sent already or not
            const checking = await Invitation.findOne({ event: req.body.event._id, sendTo: req.body.usersRole[x].id })

            if (!checking) {
                const invitation = await Invitation({
                    event: req.body.event._id,
                    sendBy: req.user.id,
                    sendTo: req.body.usersRole[x].id,
                    sendDate: new Date(),
                    role: req.body.usersRole[x].role,
                })
                await invitation.save()
                console.log('--------then--------------------')

                resData.push(invitation)
                // done: append sentInv of me 

                me = await User.findByIdAndUpdate(req.user.id, { $push: { sentInv: invitation._id } })
                // done: append receivedInv of usersRole[x]._id 
                const users = await User.findByIdAndUpdate(req.body.usersRole[x].id, { $push: { receivedInv: invitation._id } })

                //returning updated currentUser so it can update the redux state
            }



        }

        // console.log(resData)
        res.status(200).json(me)

    } catch (error) {
        next(error)
    }
}

export const sentByMe = async (req, res, next) => {

    if (!req.user.id) return next(errHandler(401, 'bad authorization'))

    try {
        const invSentByMe = await Invitation.find({ sendBy: req.user.id }).populate(
            [
                {
                    path: 'event',
                    select: ['name']

                },
                {
                    path: 'sendTo',
                    select: ['firstName', 'lastName', 'email']
                }
            ]
        ).sort({createdAt:-1})

        res.status(200).json(invSentByMe)

    } catch (error) {
        next(error)
    }
}

export const received = async (req, res, next) => {
    if (!req.user.id) return next(errHandler(401, 'bad authorization'))

    try {
        const receivedInvitations = await Invitation.find({ sendTo: req.user.id }).populate(
            [
                {
                    path: 'event',
                    // select: ['name']

                },
                {
                    path: 'sendTo',
                    select: ['firstName', 'lastName', 'email']
                }
            ]
        )

        res.status(200).json(receivedInvitations)

    } catch (error) {
        next(error)
    }

}

export const postResponse = async (req, res, next) => {

    if (!req.body.response) return next(errHandler(400, 'need response'))
    try {
        const invitation = await Invitation.findByIdAndUpdate(req.body.id,
            {
                $set: {
                    response: req.body.response,
                    responseDate: new Date()
                }
            }, { new: true }
        )

        res.status(200).json(invitation)

    } catch (error) {
        next(error)
    }

}

export const deleteInv = async (req, res, next) => {
    try {
        const invitation = await Invitation.findByIdAndDelete(req.body.id).populate(
            [
                {
                    path: 'sendTo',
                    select: ['firstName']
                }

            ]
        )

        if (invitation) {
            const me = await User.findByIdAndUpdate(req.user.id, { $pull: { sentInv: invitation._id } })
            const other = await User.findByIdAndUpdate(invitation.sendTo._id, { $pull: { receivedInv: invitation._id } })
        }
        res.status(200).json(invitation)

    } catch (error) {
        next(error)
    }
}