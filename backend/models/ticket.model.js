import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema(
    {
        event:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isPaid:{
            type: Boolean,
            default: false,
        },
        paidDate:{
            type: String,

        }
    },{timestamps: true}
)

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;