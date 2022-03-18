const Submission = require("../schema/Schema.Submission");

class SubmissionStorage {
  async submissiontStorage(res, ...submission) {
    Submission.create(submission[0], (error) => {
      if (error) {
        console.log(error);
        res.send("Unexpected Error Occured");
        res.status(400);
      } else {
        res.status(200);
      }
    });
  }
}

module.exports = SubmissionStorage;
