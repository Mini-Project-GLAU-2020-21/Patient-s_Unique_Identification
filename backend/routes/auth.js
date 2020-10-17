var express = require('express');
var router = express.Router();

const {signup} = require("../controllers/auth");
const { check, validationResult } = require('express-validator');


router.post(
    "/signup", 
    [           // if check("name", "name should be atleast of 3 letters.") doesn't works, use   check("name").isLength({ min: 3 }).withMessage('must be at least 3 chars long')
        check("f_name", "name should be at least of 3 char").isLength({ min: 3 }),
        check("email", "email is required.").isEmail(),
        check("password", "password should be at least 5 char").isLength({ min: 5 })
    ], 
    signup
);


module.exports = router;