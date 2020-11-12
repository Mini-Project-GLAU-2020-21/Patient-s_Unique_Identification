const express = require("express");
const router = express.Router();



const { getPatientById, getPatientByOwn, getPatientForGuest, updatePatient, uploadDocument, viewListOfDocuments } = require("../controllers/patient");  
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

// params
router.param("patientId", getPatientById);


//actual routes

// get patient routes
router.get("/patient/:patientId", isSignedIn, isAuthenticated, getPatientByOwn);

// update patient route
router.put("/patient/:patientId", isSignedIn, isAuthenticated, updatePatient);

// upload document route
router.put("/patient/uploadDocument/:patientId", isSignedIn, isAuthenticated, uploadDocument);

// view all documents of a particular patient route
router.get("/patient/allDocuments/:patientId", isSignedIn, isAuthenticated, viewListOfDocuments);


module.exports = router;