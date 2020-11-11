const Patient = require("../models/patient");
const Documents = require("../models/document");
const formidable = require("formidable");
const { deleteOne } = require("../models/patient");
const { size, sortBy } = require("lodash");
const fs = require("fs");            //fs stands for file system. we don't need to install it..it comes inbuilt with nodejs
const document = require("../models/document");






exports.getPatientById = (req, res, next, id) => {
    Patient.findById(id).exec((err, patient) => {
        if(err || !patient){
            return res.status(400).json({
                error: "No patient found in DB!!!"
            });
        }
        req.profile = patient;
        next();
    });
};


//to return patient's own details
exports.getPatientByOwn = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    return res.json(req.profile);
};


//to return any patient's details for guest login
exports.getPatientForGuest = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.p_contact_number = undefined;
    req.profile.email = undefined;
    return res.json(req.profile);
};


// to update patient
exports.updatePatient = (req, res) => {
    Patient.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, patient) => {
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update this detail."
                });
            }
            patient.salt = undefined;
            patient.encry_password = undefined;
            patient.createdAt = undefined;
            res.json(patient);
        }
    );
};




// to upload a document in patient's schema
exports.uploadDocument = (req, res) => {
    
};