const mongoose = require("mongoose");

const dreamSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        type: { type: String, required: true },
        priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
        productLink: { type: String },
        targetDate: { type: Date },
        imageUrl: { type: String },
        note: String,
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
        completedAt: Date,

        // 🔐 ADD THIS
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Dream", dreamSchema);