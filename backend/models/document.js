const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const documenttSchema = new mongoose.Schema(
    {
        by_doctor_name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        category:{
            type: ObjectId,
            ref: "Category",
            required: true
        },
        document_pdf: {
           data: Buffer,
            contentType: String
        }
    }, 
    { timestamps: true }
);