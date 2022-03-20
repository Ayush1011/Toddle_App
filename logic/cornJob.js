const cron = require("node-cron");
const Assignments = require("../schema/Schema.Assigment");
const Status = require("../constants/_constant.status");
const Student = require("../schema/Schema.Student");

var updateStatus = () => {
  Assignments.updateMany(
    { scheduledDate: { $lt: new Date() } },
    {
      $set: {
        Assigments: {
          assignmentStatus: Status.ONGOING,
        },
      },
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

  Student.updateMany(
    { "Assigments.expiryDate": { $lt: new Date() } },
    {
      $set: {
        "Assigments.$.status": Status.OVERDUE,
      },
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

var CornSchedule = cron.schedule("0 18 * * *", function () {
  updateStatus();
});

module.exports = CornSchedule;
