var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const Student = new Schema({
  studentName: {
    type: String,
    require: true,
  },
  studentID: {
    type: Number,   
  },
  Assigments: [{
    assignmentID:{
      type:Number
    },
    status:{
      type:String,
    },
    scheduledDate:{
      type:Date,
    },
    expiryDate:{
      type:Date,
    },

  }]
});

module.exports = mongoose.model("student", Student);
