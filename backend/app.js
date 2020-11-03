require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");


// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
}).catch( () => {
    console.log("DB GOT OOPS!!")
});





// middlewares
app.use(bodyParser.json());             //use url encoded instead of bodyParser.json()....go and check dis on bodyParser site,How to use it.
app.use(cookieParser());
app.use(cors());


//Routes
app.use("/api", authRoutes);
app.use("/api", patientRoutes);




// Port
const port = process.env.PORT || 10000;

// starting server
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});