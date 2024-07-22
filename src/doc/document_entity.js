import mongoose from "mongoose";
import sectionSchema from "../section/section_entity.js";

const docSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    editor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
        required: true,
    },
    sections: {
        type: [sectionSchema],
        required: false,
    }
});

const docModel = mongoose.model("Document", docSchema);

export default docModel;