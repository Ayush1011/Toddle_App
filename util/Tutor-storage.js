const Tutor = require("../schema/Schema.Student");
const getId = require("./GetLastId");

class TutorStorage {
  async tutorStorage(res, ...Tutors) {
    var GetLastID = new getId();

    GetLastID.getID("Tutor").then((result) => {
      Tutors[0].TutorID = result == undefined ? 1 : result.TutorID + 1;
      Tutor.create(Tutors[0], (error) => {
        if (error) {
          console.log(error);
          res.send("Unexpected Error Occured");
          res.status(400);
        } else {
          res.status(200);
        }
      });
    });
  }
}

module.exports = TutorStorage;
