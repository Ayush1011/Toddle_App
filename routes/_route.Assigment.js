const express = require("express");
const assignmentRouter = express.Router();
const Assignments = require("../schema/Schema.Assigment");
const AssigmentStorage = require("../controller/_controller.Assigment");
const auth = require("../logic/jwt");

assignmentRouter.use(express.urlencoded({ extended: true }));

// Route to get all Assignments (i.e assignment/all)
assignmentRouter.route("/all").get(auth,async(req, res) => {
  res.setHeader("Content-Type", "application/json");
  var result = await Assignments.find();
  res.send(result);
});

// Route to create Assignments (i.e assignment/createassigment)
assignmentRouter.route("/createassigment").post(auth,async(req, res) => {
  const Assigment = new AssigmentStorage();
  await Assigment.assigmentStorage(res, req.body);
 
});

// Route to get Assignments by ID (i.e assignment/{id})
assignmentRouter.route("/:id").get(auth,async(req, res, next) => {
  const Assignment = new AssigmentStorage();
  await Assignment.getAssignmentById(req.params.id,res);

});

// Route to get Assignments by ID (i.e assignment/{id})
assignmentRouter.route("/bytutor/:id").get(auth,async(req, res, next) => {
  const Assignment = new AssigmentStorage();
  await Assignment.getAssigmentByTutor(req.params.id,res);

});

assignmentRouter.route("/status/:id").get(auth,async(req, res, next) => {
  const Assignment = new AssigmentStorage();
  const Result =await Assignment.getAssigmentByFilter(req.params.id,res);
  res.send(Result);
});


module.exports = assignmentRouter;
