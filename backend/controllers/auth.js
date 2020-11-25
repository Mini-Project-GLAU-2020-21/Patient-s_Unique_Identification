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
                error: "Not able to save your details in our database."
            });
        }
        res.json({
            f_name: patient.f_name,
            l_name: patient.l_name,
            email: patient.email,
            id: patient._id
        });
    });
};


exports.signin = (req, res) => {
    const error = validationResult(req);
    const { email, password } = req.body;

    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()[0].msg
        });
    };

    Patient.findOne({email}, (err, patient) =>{
        if(err || !patient){
            return res.status(400).json({
                error: "Patient email does not exists"
            })
        }

        if(!patient.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        //Create token
        const token = jwt.sign({_id: patient._id}, process.env.SECRET_Key);
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        //send response on frontend
        const {_id, f_name, l_name, email, p_contact_number, r_contact_number, 
                r_name, r_relation , address, blood_group, upi, gender, dob , role} = patient;
                
        return res.json({ token, patient: {_id, f_name, l_name, email, p_contact_number,
             r_contact_number, r_name, r_relation , address, blood_group, gender, upi, dob , role}})
    })

}


exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};







//protected routes


exports.isSignedIn = expressJwt({
    secret: process.env.SECRET_Key,
    userProperty: "auth"
});


//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if( !checker ){
        return res.status(403).json({
            error: "ACCESS DENIED !!!"
        });
    }
    next();
}


exports.isAdmin = (req, res, next) => {
    if( req.profile.role === 0 ){
        return res.status(403).json({
            error: "Access Denied !!! You are not authorized as you are not admin..."
        });
    }
    next();
}