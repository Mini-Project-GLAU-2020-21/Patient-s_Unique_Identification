var mongoose = requiure("mangoose");
const crypto = require("crypto");
const uuidv4 = require("uuid/v4");

var Schema = mongoose.Schema;
var patientSchema = new Schema({
    f_name: {
        type: String,
        required: true,
        maxlength: 15,
        trim: true
    },
    m_name:{
        type: String,
        maxlength: 15,
        trim: true
    },
    l_name: {
        type: String,
        maxlength:15,
        trim: true
    },
    email: {
        type: String,
        trim:true,
        unique: true
    },
    contact_number: {
        type: 
    }
});