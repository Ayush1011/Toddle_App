const Tutor = require("../schema/Schema.Tutor");
const getId = require("./GetLastId");

class TutorStorage {
  async tutorStorage(res, ...Tutors) {
    var GetLastID = new getId();

    GetLastID.getID("Tutor").then((result) => {
      Tutors[0].TutorID = result == undefined ? 1 : result.TutorID + 1;
      Tutor.create(Tutors[0], (error) => {
        if (error) {
          console.log(error);
          res.status(400).send(error.message);
        } else {
          res.status(200).send("created Tutor");
        }
      });
    });
  }
  async getTutorByID(query,res){
    await Tutor.find({TutorID:query}, (error, data) => {
      if (error) {
        res.status(400);
        res.send(error.message);
      } else {
        res.status(200);
        res.send(data);
      }
    }); 
   
  }

}

module.exports = TutorStorage;
