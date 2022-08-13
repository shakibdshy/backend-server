import mongoose from "mongoose"
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";


export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = await User({ ...req.body, password: hash });

        await newUser.save();

        res.status(200).json(newUser);


    } catch (error) {
        next(createError(500, "User already exists"));
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(createError(404, "User not found"));
        }

        const isValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isValid) {
            return next(createError(401, "Invalid password"));
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        const {password, ...others} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others);

    } catch (error) {
        next(createError(500, "User already exists"));
    }
}