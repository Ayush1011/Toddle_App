var express = require("express");
const assignmentRouter = express.Router();
const Assignments = require('../schema/Schema.Assigment');
assignmentRouter.use(express.urlencoded({ extended: true }));


assignmentRouter.route("/")
.get(async(req,res)=>{
    res.setHeader("Content-Type", "application/json");
       res.send("hello")
})

assignmentRouter.route("/createassigment")
.post(async(req,res)=>{

    const {Assigments_id,
        Assigments_Name,
        Assigments_Description,
        Students,
        Publish_date,
        Expiry_date}=req.body;

    Assignments.create({
        Assigments_id,
        Assigments_Name,
        Assigments_Description,
        Students,
        Publish_date,
        Expiry_date});

    res.send("Created Assigment :- "+Assigments_Name)
})

module.exports = assignmentRouter;