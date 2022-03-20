var express = require("express");
const tutorRouter = express.Router();
const Tutor = require("../schema/Schema.Tutor");
const auth = require("../logic/jwt");
const TutorStorage = require("../controller/_controller.Tutor");

tutorRouter.use(express.urlencoded({ extended: true }));

tutorRouter.route("/all").get(auth, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  var result = await Tutor.find();
  res.send({ "List of all tutor's : ": result });
});

tutorRouter.route("/createtutor").post(async (req, res) => {
  const Tutors = new TutorStorage();
  await Tutors.tutorStorage(res, req.body);
});
tutorRouter.route("/:id").get(async (req, res, next) => {
  const Tutors = new TutorStorage();
  await Tutors.getTutorByID(req.params.id);
});

module.exports = tutorRouter;
