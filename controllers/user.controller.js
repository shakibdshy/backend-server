import { createError } from "../error.js"
import User from "../models/User.js";

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users.reverse());
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    if (req.params.id) {
        try {
            const data = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        name: data.name,
                        address: data.address,
                        phone: data.phone,
                        email: data.email,
                        img: data.img,
                        bio: data.bio
                      }
                },
                { new: true }
            );
            const users = await User.find();
            res.status(200).json(users?.reverse());
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your account!"));
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
};
