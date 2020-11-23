var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");


var patientSchema = new mongoose.Schema({
    profile_photo:{
      data: Buffer,
      contentType: String
    },
    f_name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    l_name: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true
    },
    dob: {
      type: Date,
      //required: true,
      max: Date.now 
    },
    p_contact_number: {
      type: String,
      maxlength:10,
      unique: true,
      index: true,
      trim: true
    },
    r_name: {
      type: String,
      trim: true
    },
    r_contact_number: {
      type: String,
      maxlength:10,
      trim: true
    },
    r_relation: {
      type: String,
      trim: true
    },
    address: {
      type: String
    },
    blood_group: {
      type: String,
      maxlength: 2
    },
    upi: {
      type: String
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    documents: []
  },
  { timestamps: true }
);
  



patientSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
    this.upi = this.upiGenerator();
  })
  .get(function(){
    return this._password;
})



patientSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  
  securePassword: function(plainpassword){
    if (!plainpassword) return "";
    try {
      return crypto.createHmac('sha256', this.salt)
      .update(plainpassword)
      .digest('hex');
    }
    catch (err) {
      return "";
    }
  },

  upiGenerator: function() {
    var R1 = ((Math.floor(Math.random() * 1000) < 100) ? '0' : '') + Math.floor(Math.random() * 1000);
    var now = new Date();
    UPI = now.getFullYear().toString(); // 2011
    UPI += ((now.getMonth() < 10) ? '0' : '') + now.getMonth().toString();
    UPI += ((now.getDate() < 10) ? '0' : '') + now.getDate().toString();
    UPI += ((now.getHours() < 10) ? '0' : '') + now.getHours().toString();
    UPI += ((now.getMinutes() < 10) ? '0' : '') + now.getMinutes().toString();
    UPI += ((now.getSeconds() < 10) ? '0' : '') + now.getSeconds().toString();
    UPI += ((now.getMilliseconds() < 100) ? '0' : '') + now.getMilliseconds().toString();
    UPI += R1.toString();
    return UPI;
  }
};

module.exports = mongoose.model("Patient", patientSchema)