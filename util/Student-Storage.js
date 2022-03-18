const Student = require("../schema/Schema.Student");
const getId = require("./GetLastId");

class StudentStorage {
  async studentStorage(res, ...Students) {
    var GetLastID = new getId();

    GetLastID.getID("Student").then((result) => {
      Students[0].StudentID = result == undefined ? 1 : result.StudentID + 1;
      Student.create(Students[0], (error) => {
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

module.exports = StudentStorage;
