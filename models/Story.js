import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    img: {
        type: String,
    },
}, {
    timestamps: true,
})

export default mongoose.model("Story", StorySchema);