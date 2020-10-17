require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");





// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true ,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB CONNECTED")
}).catch( () => {
    console.log("DB GOT OOPS!!")
});

mongoose.set('useCreateIndex', true);



// middlewares
app.use(bodyParser.json());             //use url encoded instead of bodyParser.json()....go and check dis on bodyParser site,How to use it.
app.use(cookieParser());
app.use(cors());








// Port
const port = process.env.PORT || 21096;

// starting server
app.listen(port, () => {
    console.log(`App is running at ${port}`)
});