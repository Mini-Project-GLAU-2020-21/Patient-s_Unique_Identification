var express = require('express');
var router = express.Router();

const {signup, signin, signout} = require("../controllers/auth");
const { check, validationResult } = require('express-validator');




router.post(
    "/signup", 
    [           // if check("name", "name should be atleast of 3 letters.") doesn't works, use   check("name").isLength({ min: 3 }).withMessage('must be at least 3 chars long')
        check("f_name", "First Name should be at least of 3 char.").isLength({ min: 3 }).custom(value => !/\s/.test(value)),
        check("email", "Valid email is required.").isEmail().custom(value => !/\s/.test(value)),
        check("contact_number", "Valid Mobile Number is required.").isLength({ min: 10 }).isMobilePhone('en-IN'),
        check("password", "password should be at least 5 char.").custom(value => !/\s/.test(value)).isLength({ min: 5 })
    ], 
    signup
);

router.post(
    "/signin", 
    [           
        check("email", "email is required.").isEmail(),
        check("password", "password field is required.").isLength({ min: 1 })
    ], 
    signin
);

router.get("/signout", signout);


module.exports = router;