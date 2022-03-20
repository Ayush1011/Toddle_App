var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Submission = new Schema({
  assignmentID: {
    type: Number,
    require: true,
  },
  studentID: {
    type: Number,
    require: true,
  },
  submissionContent: {
    type: String,
    require: true,
  },
  submissionRemark: {
    type: String,
    default: "Not provided",
  },
  submissionDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("submission", Submission);
