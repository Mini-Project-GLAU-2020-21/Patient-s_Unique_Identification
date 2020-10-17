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



patientSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    })


patientSchema.methods = {
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function(plainpassword) {
        if(!plainpassword) return "";
        try {
            returncrypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }
        catch (err) {
            return "";
        }
    }
};



module.exports = mongoose.model("Patient", patientSchema)