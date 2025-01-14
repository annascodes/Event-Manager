import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },     
    bio:{
        type: String,
       default: 'excited to join new events...'
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    sentInv:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invitation",
            default:[]
        }
    ],
    receivedInv:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invitation",
            default:[],
        }
    ],
    savedEvents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            default:[]
        }
    ]
    

},{timestamps:true})

const User = mongoose.model('User', userSchema);
export default User;