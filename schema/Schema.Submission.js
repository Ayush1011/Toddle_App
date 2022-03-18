var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Submission = new Schema({
  Assignment_id: {
    type: Number,
    require: true,
  },
  Student_id: {
    type: Number,
    require: true,
  },
  Submission_Content: {
    type: String,
    require: true,
  },
  Submission_remark: {
    type: String,
    default: "Not provided",
  },
  Submission_Date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("submission", Submission);
