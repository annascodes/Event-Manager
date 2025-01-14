import mongoose, { model } from "mongoose";

const gallerySchema = new mongoose.Schema(
    {
        imgs:[
           {
            type: String,
            default:[]
           }
        ],
        by:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },{timestamps: true}
)

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;