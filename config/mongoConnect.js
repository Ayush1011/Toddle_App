const mongoose = require("mongoose");
const cred = require("./config");


const connect = mongoose.connect(
    cred.mongourl,
 {  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,}
  );
  connect.then(
    () => {
      console.log("Connected correctly to server");
    },
    (err) => {
      console.log(err);
    }
  );

  module.exports = connect;