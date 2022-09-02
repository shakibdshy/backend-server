import Story from "../models/Story.js";

export const getAllStory = async (req, res, next) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories.reverse());
    } catch (err) {
        next(err);
    }
};

export const StoryPost = async (req, res, next) => {
    try {
        const { email, name, img } = req.body;
        // = body;
        console.log({ email, name, img });
        const result = await Story.create({ email, name, img });
        const stories = await Story.find();
        res.status(200).send(stories.reverse());
    } catch (err) {
        next(err);
    }
};