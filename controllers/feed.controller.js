import ZoomlaFeed from "../models/Feed.js";


export const getAllFeed = async (req, res, next) => {
    try {
        const feeds = await ZoomlaFeed.find();
        res.status(200).json(feeds.reverse());
    } catch (err) {
        next(err);
    }
};

export const feedPost = async (req, res, next) => {

    try {
        const { title, email, name, img, date } = req.body;

        const newFeed = await ZoomlaFeed.create({title, email, name, img, date});
        const Feeds = await ZoomlaFeed.find();
        res.status(200).send(Feeds.reverse());
    } catch (err) {
        next(err);
    }
};


export const updateFeed = async (req, res, next) => {
    if (req.params.id) {
        try {
            const { title, img } = req.body;
            const updatedFeed = await ZoomlaFeed.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        img: img,
                        title: title,
                      }
                },
                { new: true }
            );
            const Feeds = await ZoomlaFeed.find();
            res.status(200).json(Feeds.reverse());
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your post!"));
    }
};

export const deleteFeed = async (req, res, next) => {
    if (req.params.id) {
        try {
            await ZoomlaFeed.findByIdAndDelete(req.params.id);
            const Feeds = await ZoomlaFeed.find();
            res.status(200).json(Feeds.reverse());
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
};



// Like and Comment controllers

export const likeFeed = async (req, res, next) => {
    if (req.params.id) {
        try {
            const data = req.body;
            const updatedFeed = await ZoomlaFeed.findByIdAndUpdate(
                req.params.id,
                {
                    $push: {
                        likes: data
                      }
                },
                { new: true }
            );
            const Feeds = await ZoomlaFeed.find();
            res.status(200).json(Feeds.reverse());
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your post!"));
    }
};


export const commentFeed = async (req, res, next) => {
    if (req.params.id) {
        try {
            const data = req.body;
            const updatedFeed = await ZoomlaFeed.findByIdAndUpdate(
                req.params.id,
                {
                    $push: {
                        comments: data
                      }
                },
                { new: true }
            );
            const Feeds = await ZoomlaFeed.find();
            res.status(200).json(Feeds.reverse());
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your post!"));
    }
};
