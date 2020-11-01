const Patient = require("../models/patient");



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