import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    date: {
        type: String,
    },
    time1: {
        type: String,
    },
    time2: {
        type: String,
    },
    slot: {
        type: String,
    },
    meetingId: {
        type: String,
    },
}, )

export default mongoose.model("ZoomlaMeeting", MeetingSchema);