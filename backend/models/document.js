const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const documentSchema = new mongoose.Schema(
    {
        by_doctor_name: {
            type: String,
            trim: true,
            maxlength: 32
        },
        category: {
            type: ObjectId,
            ref: 'Category'
        },
        document_file: {
            data: Buffer,
            contentType: String
        }
    }
);

module.exports = mongoose.model("Documents", documentSchema);