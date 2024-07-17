import mongoose from "mongoose";
import UserRoles from "./enum/user_roles.js";

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
        unique: false,
    },
    surname: {
        type: String,
        required: false,
        unique: false
    },
    phone: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(UserRoles),
        unique: false
    },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
