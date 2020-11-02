const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: 20,
            required: true,
            unique: true
        }
    },
    {timestamps: true }
);