const mongoose = require("mongoose");

const dreamSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    note: String,
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    completedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("Dream", dreamSchema);
