import ZoomlaMeeting from "../models/Meeting.js";

export const getAllMeeting = async (req, res, next) => {
    try {
        const meetings = await ZoomlaMeeting.find();
        res.status(200).json(meetings.reverse());
    } catch (err) {
        next(err);
    }
};

export const CreateMeeting = async (req, res, next) => {
    try {
        const { name, date, time1, time2, slot, meetingId } = req.body;
        // = body;
        console.log({ name, date, time1, time2, slot, meetingId });
        const result = await ZoomlaMeeting.create({ name, date, time1, time2, slot, meetingId });
        const meetings = await ZoomlaMeeting.find();
        res.status(200).send(meetings.reverse());
    } catch (err) {
        next(err);
    }
};

export const deleteMeeting = async (req, res, next) => {
    if (req.params.id) {
        try {
            await ZoomlaMeeting.findByIdAndDelete(req.params.id);
            const meetings = await ZoomlaMeeting.find();
            res.status(200).json(meetings.reverse());
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your meeting!"));
    }
};
