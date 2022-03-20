const Student = require("../schema/Schema.Student");
const Assignments = require("../schema/Schema.Assigment");

const getId = require("./GetLastId");

class StudentStorage {
  async studentStorage(res, ...Students) {
    var GetLastID = new getId();

    GetLastID.getID("Student").then((result) => {
      Students[0].studentID = result == undefined ? 1 : result.studentID + 1;
      Student.create(Students[0], (error, data) => {
        if (error) {
          console.log(error)
          res.status(400).send(error.message);
        } else {
          res.status(200).send(data);
        }
      });
    });
  }

  async getStudentByID(query, res) {
    await Student.find({ studentID: query }, (error, data) => {
      if (error) {
        console.log(error)
        res.status(400).send(error.message);
      } else {
        res.status(200).send(data);
      }
    });
  }
  async getStudentByAssignment(query) {
    try {
      const currentStudent = await Student.find({ studentID: query });
      const Result = [];
      currentStudent[0].Assigments.forEach((element) => {
        Result.push(Assignments.find({ assignmentID: element.assignmentID }));
      });
      const response = await Promise.all(Result);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getAssignmentByStatus(status, id) {
    try {
      console.log(status);
      switch (status) {
        case "all": {
          var Result = await Assignments.find({ Students: { $in: [id] } });
          return Result;
        }
        case "pending": {
          var Result = await Assignments.find({
            Students: { $in: [id] },
            scheduledDate: { $lt: new Date() },
          });

          return Result;
        }
        case "overdue": {
          var Result = await Assignments.find({
            Students: { $in: [id] },
            expiryDate: { $lt: new Date() },
          });

          return Result;
        }
        case "submitted": {
          var Result = await Assignments.find({
            submittedStudents: { $in: [id] },
          });
          return Result;
        }
        default: {
          return "Wrong Filter Applied";
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = StudentStorage;
