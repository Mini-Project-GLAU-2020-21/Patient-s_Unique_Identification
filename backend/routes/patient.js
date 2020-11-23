const express = require("express");
const router = express.Router();



const { getPatientById, getPatientByOwn, getPatientForGuest, updatePatient, uploadDocument, viewAllDocuments, getPatientForGuestt } = require("../controllers/patient");  
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

// params
router.param("patientId", getPatientById);
//router.param("upi", getPatientForGuestt )

//actual routes

// get patient routes
router.get("/patient/myProfile/:patientId", isSignedIn, isAuthenticated, getPatientByOwn);

// update patient route
router.put("/patient/editProfile/:patientId", isSignedIn, isAuthenticated, updatePatient);

// upload document route
router.put("/patient/uploadDocument/:patientId", isSignedIn, isAuthenticated, uploadDocument);

// view all documents of a particular patient route by user
router.get("/patient/allDocuments/:patientId", isSignedIn, isAuthenticated, viewAllDocuments);

// view all basic details of the patient by guest
//router.get("/guest/patient/:upi", getPatientForGuest);
router.post("/guest/patient/", getPatientForGuest);
router.get("/guest/patientt/:upi", getPatientForGuestt);

module.exports = router;