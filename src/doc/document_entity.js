import mongoose from "mongoose";
import {sectionSchema} from "../section/section_entity.js";

const docSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String, 
        required: true,
    },
    owner: {
        type: String, 
        required: true,
        ref: "User"
    },
    reader: {
        type: String, 
        required: false,
        ref: "User"
    },
    editor: {
        type: String, 
        required: false,
        ref: "User"
    },
    template: {
        type: String,
        required: false
    },
    sections: {
        type: [sectionSchema],
        required: false,
    }
});

const docModel = mongoose.model("Document", docSchema);

export default docModel;
