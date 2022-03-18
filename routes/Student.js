var express = require("express");
const studentRouter = express.Router();
const StudentStorage = require("../util/Student-Storage");
studentRouter.use(express.urlencoded({ extended: true }));

studentRouter.route("/").get(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send("hello");
});

studentRouter.route("/createstudent").post(async (req, res) => {
  const Tutors = new StudentStorage(req.body);
  await Tutors.studentStorage(res, req.body);
  res.send("Created Tutor :- " + req.body.StudentName);
});

module.exports = studentRouter;
