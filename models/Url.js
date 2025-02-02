const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        unique: true,
    },
    url: {
        type: String,
        required: [true, "Please provide a original URL"],
    },
    accessCount: {
        type: Number,
        default: 0,
        required: [true, "Please provide category for expense"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model("Url", UrlSchema);