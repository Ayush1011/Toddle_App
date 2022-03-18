var express = require("express");
const studentRouter = express.Router();
const Tutor = require('../schema/Schema.Tutor');
studentRouter.use(express.urlencoded({ extended: true }));


studentRouter.route("/")
.get(async(req,res)=>{
    res.setHeader("Content-Type", "application/json");
       res.send("hello")
})


studentRouter.route("/createstudent")
.post(async(req,res)=>{
    const {StudentName,StudentID}=req.body;
    Tutor.create({StudentName});
    res.send("Created Tutor :- "+StudentName)
})

module.exports = studentRouter;