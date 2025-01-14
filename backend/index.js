import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import { connectDatabase } from './config/dbconnection.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import eventRoutes from './routes/event.routes.js'
import userRoutes from './routes/user.routes.js'
import invitationRoutes from './routes/invitation.routes.js'
import ticketRoutes from './routes/ticket.routes.js'
import { v2 as cloudinary } from 'cloudinary';


const app = express();
app.use(express.json({limit: '5mb'}));
app.use(cookieParser())
dotenv.config()

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret_key
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/invitation', invitationRoutes)
app.use('/api/ticket', ticketRoutes)


const port = 5000;
app.listen(port, ()=>{
console.log(`- SERVER RUNNING ON ${port} --`.bgYellow.black)
connectDatabase()
})

app.use((err, req, res, next)=>{
    // console.log(`app.use:<${err.statusCode}-${err.message}>`)
    // console.log(err)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'middleware err msg';
    res.status(statusCode).json(
        {
            success:false,
            statusCode,
            message
        }
    )
})