import mongoose from "mongoose";
import sectionSchema from "../section/section_entity.js";
import metadataSchema from "./metadata_entity.js";

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
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    shared: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: "#FF0000"
    },
    metadata: {
        type: metadataSchema,
        required: false,
        default: {}, // Añadir valor por defecto
    },
});

const docModel = mongoose.model("Document", docSchema);

export default docModel;
