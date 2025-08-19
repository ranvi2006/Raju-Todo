const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
