import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
    {
        event:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required:true,
        },
        sendBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        sendTo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        sendDate:{
            type: String,
            required: true,        
        },
        response:{
            type: String,
            enum:['accept', 'reject', 'maybe','not responded'],
            default:'not responded',
        },
        responseDate:{
            type:String,
        },
        role:{
            type: String,
            enum:['guest', 'host', 'admin']
        },
        isSeen:{
            type: Boolean,
            default: false,
        }
           
        
        
    },{timestamps: true}
)

const Invitation= mongoose.model('Invitation', invitationSchema);
export default Invitation;