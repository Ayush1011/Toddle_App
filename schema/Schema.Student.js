var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Student = new Schema({
  StudentName: {
    type: String,
    require: true,
  },
  StudentID: {
    type: Number,
    
  },
});

module.exports = mongoose.model("student", Student);
