import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import streamAuth from './routes/streamAuth.routes.js';
import userRouter from './routes/users.routes.js';
import meetingRouter from './routes/meeting.routes.js';
import token from './routes/token.routes.js';
import feedRouter from './routes/feed.routes.js';
import storyRouter from './routes/story.routes.js';

const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('MongoDB connected');
    }).catch(err => {
        throw err;
    })
}

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/meeting", meetingRouter);
app.use("/api/token", token);
app.use("/api/feed", feedRouter);
app.use("/api/story", storyRouter);
app.use("/auth", streamAuth);

//CORS middleware
// var corsMiddleware = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'localhost');

//     next();
// }

// app.use(corsMiddleware);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    
    return res.status(status).json({
        success: false,
        status,
        message
    })
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(process.env.PORT || 8800, () => {
    connect();
    console.log('Server is running on port 8800');
});