var express = require("express");
const submissionRouter = express.Router();
const Submission = require("../schema/Schema.Submission");
submissionRouter.use(express.urlencoded({ extended: true }));
const SubmissionStorage = require("../util/Submission-Storage");

submissionRouter.route("/").get(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send("hello");
});

submissionRouter.route("/submitassignment").post(async (req, res) => {
  const Assigment = new SubmissionStorage(req.body);
  await Assigment.submissiontStorage(res, req.body);
  res.send("Created Submission :- " + req.body.Submission_Content);
});

module.exports = submissionRouter;
