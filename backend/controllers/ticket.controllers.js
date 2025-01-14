import Ticket from "../models/ticket.model.js"
import { errHandler } from "../utils/err.js"

export const createTicket = async(req, res, next)=>{
    // req.body={
    //     event: '234567893456789erty56ui45tyh',
    //     count: 2
    // }
    if(req.body.count === 0 || req.body.count<0 ) return next(errHandler(400,'atleast take 1 ticket to proceed'))
    
    if(!req.body.event) return next(errHandler(400,'no event given for ticket'))
    let tempTickets = []

    try {
        for(let x=0; x<req.body.count; x++){
            let ticket = new Ticket({
                event:req.body.event, // req.body.event contain an id of that event
                owner: req.user.id,
                isPaid: true,
                paidDate: new Date()
            })
            await ticket.save();
            tempTickets.push(ticket)
        }
        res.status(200).json(tempTickets)
    } catch (error) {
        next(error)
    }

    
}

export const getMyTickets = async(req, res, next)=>{
    try {
        const tickets = await Ticket.find({owner: req.user.id}).populate(
            [
                {
                    path:'event', 

                }
            ]
        ).sort({createdAt: -1})

        res.status(200).json(tickets)
        
    } catch (error) {
        next(error)
    }
}