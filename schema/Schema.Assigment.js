var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const Assigments = new Schema(
    {
        Assigments_id:{
            type:Number,
            require:true,         
        },
        Assigments_Name:{
            type:String,
            default:"Tutor Didn't provide a name"
        },
        Assigments_Description:{
            type:String,            
            default:"Tutor Didn't provide a Description"
        },
        Assigments_Status:{
            type:String,            
            default:"Pending"
        },
        Students:{
            type:[Number],
            required: true,            
        },
        Submitted_Students:{
            type:[Number],
            required: true,            
        },
        Publish_date:{
            type:Date,
            default:new Date(),
        },
        Expiry_date:{
            type:Date,
            required:true,
            default:new Date()
        }
    }
)

module.exports = mongoose.model("assigment", Assigments);