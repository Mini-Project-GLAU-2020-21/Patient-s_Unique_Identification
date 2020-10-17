const Patient = require("../models/patient");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');



exports.signup = (req, res) => {

    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()[0].msg
        });
    };

    const patient = new Patient(req.body)
        patient.save((err, patient) => {
            if(err || !patient){
                return res.status(400).json({
                    err: "NOT able to save user in DB"
                });
            }
            res.json({
                f_name: patient.f_name,
                m_name: patient.m_name,
                l_name: patient.l_name,
                email: patient.email,
                upi: patient.upi,
                id: patient._id
            });
        });
};