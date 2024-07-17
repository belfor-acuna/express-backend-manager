import mongoose from "mongoose";
import SectionStatus from "./section_status.js";

const sectionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(SectionStatus),
    },
});

export default sectionSchema;
