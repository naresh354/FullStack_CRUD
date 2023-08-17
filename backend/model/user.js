const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Student = mongoose.model("studentSchema", studentSchema);

module.exports = Student;