const express = require("express");
const router = express.Router();



const { getPatientById, getPatientByOwn, getPatientForGuest } = require("../controllers/patient");  
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");


router.param("patientId", getPatientById);


router.get("/patient/:patientId", isSignedIn, isAuthenticated, getPatientByOwn);
