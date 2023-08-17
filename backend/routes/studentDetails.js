const studentModel = require("../model/student");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({
    posts: {
      title: "Hi There",
    },
  });
});

router.post("/student/add", async (req, res) => {
  try {
    const studentDetails = await studentModel.create(req.body);
    res.status(200).json({ status: true, message: "Added Successfully", data: studentDetails });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/student", async (req, res) => {
  try {
    const studentDetails = await studentModel.find({});
    res.status(200).json({ studentDetails });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const studentDetails = await studentModel.findById(id);
    res.status(200).json({ studentDetails });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const studentDetails = await studentModel.findByIdAndUpdate(
      id,
      req.body
    );
    if (!studentDetails) {
      res.status(400).json({ data: "Not available student details" });
    }
    const updateStudent = await studentModel.findById(id);
    res.status(200).json({ status: true, message: "Edited Successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.delete("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id")
    const studentDetails = await studentModel.findByIdAndDelete(
      id,
      req.body
    );
    if (!studentDetails) {
      res.status(400).json({ data: "Not available delete student details" });
    }
    res.status(200).json({ status: true, message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});



module.exports = router;