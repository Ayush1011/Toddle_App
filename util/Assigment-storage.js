const Assignments = require("../schema/Schema.Assigment");
const getId = require("./GetLastId");
class AssigmentStorage {
  async assigmentStorage(res, ...Assigment) {
    var GetLastID = new getId();

    GetLastID.getID("Assignments").then((result) => {
      Assignments[0].Assigments_id =
        result == undefined ? 1 : result.Assigments_id + 1;
      Assignments.create(Assigment[0], (error) => {
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

module.exports = AssigmentStorage;
