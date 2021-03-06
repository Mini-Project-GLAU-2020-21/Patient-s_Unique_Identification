const Patient = require("../models/patient");
const Documents = require("../models/document");
const formidable = require("formidable");
const fs = require("fs");
const { check, validationResult } = require('express-validator');
const Category = require("../models/category");
const { response } = require("express");





exports.getPatientById = (req, res, next, id) => {
    Patient.findById(id).exec((err, patient) => {
        if(err || !patient){
            return res.status(400).json({
                error: "No patient found in DB"
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
    req.profile.documents = undefined;
    return res.json(req.profile);
};




//to return any patient's details for guest login
exports.getPatientForGuest = (req, res) => {
    console.log("before dstrctr: ",req.body);
    const  upi  = req.body.upi;

    Patient.findOne({upi:upi}, (err, patient) =>{
        if(err || !patient){
            return res.status(400).json({
                error: "UPI does not exists"
            })
        }
        const {f_name, l_name, r_contact_number, r_name, r_relation , address, blood_group, upi, documents} = patient;
        console.log( {f_name, l_name, r_contact_number, r_name, r_relation , address, blood_group, upi, documents})
        console.log("hgfdsdfggfd: ",patient)
        return res.json(patient);
    })
}











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
            patient.documents = undefined;
            res.json(patient);

            
        }
    );
};




// to upload a document in patient's schema
exports.uploadDocument = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with file."
            });
        }
        
        // destructure the field
        const { category, by_doctor_name } = fields;
        const categoryName = await Category.findById(category).exec()
        
       
        if(!category || !by_doctor_name) {
            return res.status(400).json({
                error: "Please include all the fields."
            });
        }
        
        let docu  = new Documents(fields);

        // handle file here
        if(file.document_file){
            if(file.document_file.size > 2000000) {           // checking the size of the file should be less than 1000000 bytes (0.95 MB)
                return res.status(400).json({
                    error: "File is too big."
                })
            }
            docu.by_doctor_name = by_doctor_name
            docu.category = category
            docu.categoryName = categoryName.name
           
            Patient.findByIdAndUpdate(
                {_id: req.profile._id},
                {$push: {documents: docu}},
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
                    patient.documents = undefined;
                    res.json(patient);
                }
            );
            
            docu.document_file.data = fs.readFileSync(file.document_file.path)
            docu.document_file.contentType = file.document_file.type
        }

        // save file to DB
        docu.save((err, docu) => {
            if (err) {
                return res.status(400).json({
                    error: "Saving file in DB failed"
                });
            }
            return ;
        });
    });
};




// to view list of all the documents
exports.viewAllDocuments = (req, res) => {
    const documents = req.profile.documents;
    if (documents.length == 0) {
        return res.status(400).json({
            error: "No document found in your DB"
        });
    }
    else {
        res.json(documents);
    return ;
    }
};