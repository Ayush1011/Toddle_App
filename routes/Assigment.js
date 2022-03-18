var express = require("express");
const assignmentRouter = express.Router();
const Assignments = require("../schema/Schema.Assigment");
const AssigmentStorage = require("../util/Assigment-storage");
assignmentRouter.use(express.urlencoded({ extended: true }));

assignmentRouter.route("/").get(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send("hello");
});

assignmentRouter.route("/createassigment").post(async (req, res) => {
  const Assigment = new AssigmentStorage(req.body);
  await Assigment.assigmentStorage(res,req.body);
  res.send("Assigment Created");
});

module.exports = assignmentRouter;
