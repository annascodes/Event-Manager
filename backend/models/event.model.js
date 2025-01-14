import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        imgs: [
            {
                type: String,
                default: 'https://images.unsplash.com/photo-1627931539006-d5c4677e05ea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
        ],
        name: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        
        registrationEndDate: {
            type: String,
            required: true, 
        }
        ,
        timeStart: {
            type: String,
            required: true,
        },
        timeEnd: {
            type: String,
            required: true,
        },
        venue: {
            type: String,
            required: true
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Registraion Open', 'Registraion Close', 'Ongoing', 'Past', 'Cancelled'],
            required: true,
        },
        city: {
            type: String,
            required: true
        }

    }, { timestamps: true }
)

const Event = mongoose.model("Event", eventSchema);
export default Event;