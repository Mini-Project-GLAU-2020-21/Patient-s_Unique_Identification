var mongoose = requiure("mangoose");
const crypto = require("crypto");
const uuidv4 = require("uuid/v4");
var mongooseTypePhone = require("mongoose-type-phone");

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
    dob: {
        type: Date,
        required: true,
        max: Date.now 
    },
    contact_number: {
        type: mongoose.SchemaTypes.Phone,
        required: 'Phone number should be set correctly',
        allowBlank: false,
        allowedNumberTypes: mongooseTypePhone.PhoneNumberType.MOBILE,
        phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
        defaultRegion: 'IN',
        parseOnGet: false
    },
    encry_password: {
        type: String,
        required: true,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    }
},
    {timestamps: true}
);