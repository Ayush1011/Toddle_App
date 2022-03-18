var express = require("express");
const submissionRouter = express.Router();
const Submission = require('../schema/Schema.Submission');
submissionRouter.use(express.urlencoded({ extended: true }));


submissionRouter.route("/")
.get(async(req,res)=>{
    res.setHeader("Content-Type", "application/json");
       res.send("hello")
})



submissionRouter.route("/submitassignment")
.post(async(req,res)=>{
    const {Assignment_id,Student_id,Submission_Content,Submission_remark,Submission_Date}=req.body;
    Submission.create({Assignment_id,Student_id,Submission_Content,Submission_remark,Submission_Date});
    res.send("Created Tutor :- "+Submission_Content)
})

module.exports = submissionRouter;