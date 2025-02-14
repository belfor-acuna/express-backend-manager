import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
        unique: false,
    },
    salt: {
        type: String,
        required: true,
        unique: false,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 1000 * 60 * 15), // Expira en 15 minutos
    }
});

// Elimina los tokens expirados automáticamente
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const PasswordResetToken = mongoose.model("PasswordResetToken", passwordResetSchema);

export default PasswordResetToken;
