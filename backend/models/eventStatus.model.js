import mongoose from "mongoose";

const eventStatusSchema = new mongoose.Schema(
    {
        status:{
            type: String,
            required: true
        }
    }
)

const eventStatus = mongoose.model('EventStatus', eventStatusSchema);
export default eventStatus;