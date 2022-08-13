import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/users.routes.js';
import meetingRouter from './routes/meeting.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('MongoDB connected');
    }).catch(err => {
        throw err;
    })
}

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/meeting", meetingRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    
    return res.status(status).json({
        success: false,
        status,
        message
    })
});

app.listen(8800, () => {
    connect();
    console.log('Server is running on port 8800');
});