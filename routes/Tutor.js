var express = require("express");
const tutorRouter = express.Router();
const Tutor = require('../schema/Schema.Tutor');
const auth = require("../logic/jwt");
tutorRouter.use(express.urlencoded({ extended: true }));


tutorRouter.route("/all")
.get(auth,async(req,res)=>{

    res.setHeader("Content-Type", "application/json");
    var result = await Tutor.find();
    res.send({"List of all tutor's : " : result});
    
})



tutorRouter.route("/createtutor")
.post(async(req,res)=>{
    const TutorName=req.body.TutorName;
    Tutor.create({TutorName});
    res.send("Created Tutor :- "+TutorName)
})

module.exports = tutorRouter;