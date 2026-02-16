const mongoose = require("mongoose");

const dreamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    note: {
        type: String
    },
    link: {
        type: String
    },
    type: {
        type: String,   // product or activity
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Dream", dreamSchema);
