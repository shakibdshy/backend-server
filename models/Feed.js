import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    userId: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    img: {
        type: String,
    },
    date: {
        type: String,
    },
    likes: [{ email: String }],
    comments: [{ email: String, comment: String }],
},)

export default mongoose.model("ZoomlaFeed", FeedSchema);