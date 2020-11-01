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