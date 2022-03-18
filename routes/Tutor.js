var express = require("express");
const tutorRouter = express.Router();
const Tutor = require("../schema/Schema.Tutor");
const auth = require("../logic/jwt");
const TutorStorage = require("../util/Tutor-storage");

tutorRouter.use(express.urlencoded({ extended: true }));

tutorRouter.route("/all").get(auth, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  var result = await Tutor.find();
  res.send({ "List of all tutor's : ": result });
});

tutorRouter.route("/createtutor").post(async (req, res) => {
  const Tutors = new TutorStorage(req.body);
  await Tutors.tutorStorage(res, req.body);
  res.send("Created Tutor :- " + req.body.TutorName);
});

module.exports = tutorRouter;
