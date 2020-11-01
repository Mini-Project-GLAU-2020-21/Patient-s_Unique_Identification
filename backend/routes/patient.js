const express = require("express");
const router = express.Router();



const { getPatientById, getPatientByOwn, getPatientForGuest, updatePatient } = require("../controllers/patient");  
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");


router.param("patientId", getPatientById);


router.get("/patient/:patientId", isSignedIn, isAuthenticated, getPatientByOwn);

router.put("/patient/:patientId", isSignedIn, isAuthenticated, updatePatient);



module.exports = router;