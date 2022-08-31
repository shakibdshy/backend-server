import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import { connect } from "getstream";
import crypto from "crypto";
import { StreamChat } from 'stream-chat';

dotenv.config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

export const signup = async (req, res, next) => { 
    try {
        const { username, email, password, phoneNumber } = req.body;
                
        const userId = crypto.randomBytes(10).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({ token, fullName, username, email, userId, hashedPassword, phoneNumber });
        
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => { 
    try {
        const { username, password } = req.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });

        if (!users.length) return res.status(400).json({ message: 'User not found' });

        const success = bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if (success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        next(error);
    }
}