import mongoose from "mongoose";
import sectionSchema from "../section/section_entity.js";
 
const templateSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sections: {
        type: [sectionSchema],
        required: false,
    }
});

const templateModel = mongoose.model("Template", templateSchema);

export default templateModel;
