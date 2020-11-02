const express = require("express");
const router = express.Router();


const {getCategoryById, createCategory, getCategory, updateCategory, removeCategory} = require("../controllers/category");
const {getPatientById} = require("../controllers/patient");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");

