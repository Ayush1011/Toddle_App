const Assignments = require("../schema/Schema.Assigment");
const Student = require("../schema/Schema.Student");
const Status = require("../constants/_constant.status");

const getId = require("./GetLastId");

class AssigmentStorage {
  async studentAssignment(students, assigmentID, scheduledDate, expiryDate) {
    
    students.forEach((element) => {
      Student.updateOne(
        { studentID: element },
        {
          $push: {
            Assigments: {
              assignmentID: assigmentID,
              status: "PENDING",
              scheduledDate: scheduledDate,
              expiryDate: expiryDate,
            },
          },
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  }

  async assigmentStorage(res, ...Assigment) {
    var GetLastID = new getId();
    

    GetLastID.getID("Assigment").then((result) => {
      Assigment[0].assignmentID = result == undefined ? 1 : result.assignmentID + 1;

      this.studentAssignment(
        Assigment[0].Students,
        Assigment[0].assignmentID,
        Assigment[0].scheduledDate,
        Assigment[0].expiryDate
      );
      Assignments.create(Assigment[0], (error) => {
        if (error) {
          res.status(400);
          res.send(error.message);
        } else {
          res.status(200);
          res.send(Assigment[0]);
        }
      });
    });
  }

  async getAssignmentById(query, res) {
    await Assignments.find({ assignmentID: query }, (error, data) => {
      if (error) {
        res.status(400);
        res.send(error.message);
      } else {
        res.status(200);
        res.send(data);
      }
    });
  }

  async getAssigmentByTutor(query, res) {
    await Assignments.find({ teacherID: query }, (error, data) => {
      if (error) {
        res.status(400);
        res.send(error.message);
      } else {
        res.status(200);
        res.send(data);
      }
    });
  }

  async getAssigmentByFilter(query,res) {
    try {
      switch (query) {
        case "scheduled": {
          var Result = await Assignments.find({
            scheduledDate: { $gt: new Date() },
          });
          return Result;
        }
        case "ongoing": {
          var Result = await Assignments.find({
            scheduledDate: { $lt: new Date() },
            expiryDate: { $gt: new Date() },
          });
          return Result;
        }
        default: {
          res.status(400).send("Wrong Filter");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = AssigmentStorage;
