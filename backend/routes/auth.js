const router = require("express").Router();
const Student  = require("../model/user");
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/register", async (req, res) => {
    try {

         //if email exists
         const emailExist = await Student.findOne({ email: req.body.email });
         if(emailExist) return res.status(400).json({ error: "Email Already Exist" })
 
         //Hash password
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(req.body.password, salt)
 

        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })
       
        const saveDetails = await student.save()
        res.status(200).json({ 
            message: "Register Successfully",
            status: true
        })



    } catch (err) {
        res.status(400).json({ error: err })
        console.log(err, "err")
    }
})

router.post("/login", async (req, res) => {
    try {
        // Email is not found
        const emailExist = await Student.findOne({ email: req.body.email });
        if (!emailExist) {
            return res.status(400).json({ error: "Email Not Registered" });
        }

        console.log(emailExist, "emailExist");

        // Incorrect password
        const validPassword = await bcrypt.compare(req.body.password, emailExist.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Incorrect Password" });
        }

        // JWT sign
        const token = jwt.sign({ _id: emailExist._id }, process.env.TOKEN_SECRET);

        // Respond with success message and token
        res.status(200).json({
            message: "Login Successfully",
            status: true,
            token: token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

module.exports = router;