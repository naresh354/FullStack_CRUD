const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors())

app.use(express.json());

mongoose.connect("").then(() => console.log("MongoDB run suceessfully")).catch(err => console.log(err))

const authRoute = require("./routes/auth");
const studentRoute = require("./routes/studentDetails");

app.use("/api/auth", authRoute);
app.use("/api/studentDetails", studentRoute)

app.listen(8080 , () => {
    console.log("Server Listen successfully");
})