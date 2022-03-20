var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Assigments = new Schema({
  assignmentID: {
    type: Number,
  },
  assignmentName: {
    type: String,
    default: "Tutor Didn't provide a name",
  },
  assignmentDescription: {
    type: String,
    default: "Tutor Didn't provide a Description",
  },
  assignmentStatus: {
    type: String,
    default: "SCHEDULED",
  },
  teacherID: {
    type: Number,
    required: true,
  },
  Students: {
    type: [Number],
    required: true,
  },
  submittedStudents: {
    type: [Number],
    required: true,
  },
  publishDate: {
    type: Date,
    default: new Date(),
  },
  scheduledDate: {
    type: Date,
    required: true,  
  },
  expiryDate: {
    type: Date,
    required: true,    
  },
});

module.exports = mongoose.model("assigment", Assigments);
