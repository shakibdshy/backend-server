import mongoose from "mongoose"
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import { connect } from "getstream";
import crypto from "crypto";
import { StreamChat } from 'stream-chat';

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;


export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const userId = crypto.randomBytes(16).toString("hex");
        const serverClient = connect(api_key, api_secret, app_id);
        const token = serverClient.createUserToken(userId);
        const newUser = new User({ token, ...req.body, password: hash });

        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    try {
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);
        const user = await User.findOne({ email: req.body.email });

        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password, ...others } = user._doc;

        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(others);
        
    } catch (err) {
        next(err);
    }
};