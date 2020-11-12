const Patient = require("../models/patient");
const Documents = require("../models/document");
const formidable = require("formidable");
const { deleteOne } = require("../models/patient");
const { size, sortBy } = require("lodash");
const fs = require("fs");            //fs stands for file system. we don't need to install it..it comes inbuilt with nodejs






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
    req.profile.documents = undefined;
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
            patient.documents = undefined;
            res.json(patient);
        }
    );
};




// to upload a document in patient's schema
exports.uploadDocument = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with file."
            });
        }

        // destructure the field
        const { category, by_doctor_name } = fields;


        if(!category || !by_doctor_name) {
            return res.status(400).json({
                error: "Please include all the fields."
            });
        }
        
        let docu  = new Documents(fields);


        // handle file here
        if(file.document_file){
            if(file.document_file.size > 1000000) {           // checking the size of the file should be less than 1000000 bytes (0.95 MB)
                return res.status(400).json({
                    error: "File is too big."
                })
            }
            docu.document_file.data = fs.readFileSync(file.document_file.path)
            docu.document_file.contentType = file.document_file.type
            docu.by_doctor_name = by_doctor_name
            docu.category = category
        }

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
    });
};


/*exports.viewDocument = (req, res) => {
    const documents = req.profile.documents;
    if (documents.length === 0) {
        return res.status(400).json({
            message: "No document found in your DB"
        })
    }

    documents
    .populate("category")
    .sort([[sortBy,"asc"]])
    .select("-documents_file")
    .exec((err, ))
};*/