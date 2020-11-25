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
const categoryRoutes = require("./routes/category");
const documentRoutes = require("./routes/document");

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
app.use(bodyParser.json());             
app.use(cookieParser());
app.use(cors());


//Routes
app.use("/api", authRoutes);
app.use("/api", patientRoutes);
app.use("/api", categoryRoutes);
app.use("/api", documentRoutes);



// Port
const port = process.env.PORT || 11000;

// starting server
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});