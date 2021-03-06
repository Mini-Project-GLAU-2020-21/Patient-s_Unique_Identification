const express = require("express");
const router = express.Router();


const {getCategoryById, createCategory, getCategory, updateCategory, removeCategory, getAllCategory} = require("../controllers/category");
const {getPatientById} = require("../controllers/patient");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");



// params
router.param("PatientId", getPatientById);
router.param("categoryId", getCategoryById);



// actual routes goes here

//"create" route
router.post("/category/create/:PatientId", isSignedIn, isAuthenticated, isAdmin, createCategory);

//"read" routes
router.get("/categories/:categoryId", getCategory);
router.get("/categories", getAllCategory);


//"update route"
router.put("/category/:categoryId/:PatientId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

//delete route
router.delete("/category/:categoryId/:PatientId", isSignedIn, isAuthenticated, isAdmin, removeCategory);


module.exports = router;