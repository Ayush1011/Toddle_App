var express = require("express");
const studentRouter = express.Router();
const StudentStorage = require("../controller/_controller.Student");
const auth = require("../logic/jwt");
studentRouter.use(express.urlencoded({ extended: true }));

studentRouter.route("/createstudent").post(auth,async(req, res) => {
  const Students = new StudentStorage(req.body);
  await Students.studentStorage(res, req.body);
});

studentRouter.route("/:id").get(auth,async(req, res, next) => {
  const Students = new StudentStorage();
  await Students.getStudentByID(req.params.id,res);
 
});

studentRouter.route("/forstu/:id").get(auth,async(req, res, next) => {
  const Students = new StudentStorage();
  const Result = await Students.getStudentByAssignment(req.params.id,res);
  res.send(Result);
});

studentRouter.route("/:status/:id").get(auth,async(req, res, next) => {
  const Students = new StudentStorage();
  const Result =await Students.getAssignmentByStatus(req.params.status,req.params.id);
  res.send(Result);
});

module.exports = studentRouter;
