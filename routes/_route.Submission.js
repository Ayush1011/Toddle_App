var express = require("express");
const submissionRouter = express.Router();
const auth = require("../logic/jwt");
const SubmissionStorage = require("../controller/_controller.Submission");
submissionRouter.use(express.urlencoded({ extended: true }));


submissionRouter.route("/submitassignment").post(auth,async (req, res) => {
  const Assigment = new SubmissionStorage(req.body);
  await Assigment.submissiontStorage(res, req.body);
});

module.exports = submissionRouter;
