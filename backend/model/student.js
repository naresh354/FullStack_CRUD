const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Please enter product name"],

    },
    class: {
        type: Number,
        required: true,
        
    }
},
{
    timestamps: true
})

const studentDetails = mongoose.model("studentDetails", studentSchema);

module.exports = studentDetails;