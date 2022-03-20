var mongoose = require("mongoose");
const { isNumber } = require("util");
var Schema = mongoose.Schema;

const Tutor = new Schema({
  TutorName: {
    type: String,
    require: true,
  },
  TutorID: {
    type: Number,
  },
});

module.exports = mongoose.model("tutor", Tutor);
