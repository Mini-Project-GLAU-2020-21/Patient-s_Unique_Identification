const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getPatientById } = require("../controllers/patient");
const { getDocumentById, document_file } = require("../controllers/document");


// params
router.param("patientId", getPatientById);
router.param("documentId", getDocumentById);




// actual routes
router.get("/patient/document/:documentId", document_file);



module.exports = router;