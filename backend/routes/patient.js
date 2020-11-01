const express = require("express");
const router = express.Router();



const { getPatientById, getPatientByOwn, getPatientForGuest } = require("../controllers/patient");  