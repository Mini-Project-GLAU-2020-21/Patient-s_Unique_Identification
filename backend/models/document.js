const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const documentSchema = new mongoose.Schema(
    {
        fileName: {
          type: String 
        },
        by_doctor_name: {
            type: String,
            trim: true,
            maxlength: 32
        },
        category: {
            type: ObjectId,
            ref: 'Category'
        },
        categoryName: {
            type: String
        },
        document_file: {
            data: Buffer,
            contentType: String
        }
    }
);

module.exports = mongoose.model("Documents", documentSchema);