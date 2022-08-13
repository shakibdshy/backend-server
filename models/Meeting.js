import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model("Meeting", MeetingSchema);