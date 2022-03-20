const Submission = require("../schema/Schema.Submission");
const Assignments = require("../schema/Schema.Assigment");
const Student = require("../schema/Schema.Student");
const Status = require("../constants/_constant.status");

class SubmissionStorage {
  async submittedStudent(assigmentID, studentID) {
    Student.updateOne(
      { "Assigments.assignmentID": assigmentID, studentID: studentID },
      {
        $set: {
          "Assigments.$.status": Status.SUBMITTED,
        },
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
      console.log(assigmentID)
    Assignments.updateOne(
      { assignmentID: assigmentID },
      {
        $push: { submittedStudents: studentID },
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  async submissiontStorage(res, ...submission) {
    var exisitingStudent = await Submission.find({
      assignmentID: submission[0].assignmentID,
      studentID: submission[0].studentID,
    });
    if (exisitingStudent == []) {
      this.submittedStudent(
        submission[0].assignmentID,
        submission[0].studentID
      );

      Submission.create(submission[0], (error) => {
        if (error) {
          console.log(error);
          res.status(400).send(error);
        } else {
          res.status(200).send({ submitted: submission[0] });
        }
      });
    } else {
      res.send("Already submitted the assignment");
    }
  }
}

module.exports = SubmissionStorage;
