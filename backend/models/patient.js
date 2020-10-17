var mongoose = requiure("mangoose");
const crypto = require("crypto");
const uuidv4 = require("uuid/v4");

var Schema = mongoose.Schema;
var patientSchema = new Schema({
    fname: {
        type: String,
        required: true
    }
});