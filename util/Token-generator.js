const jwt = require("jsonwebtoken");
var cred = require("../config/config");

class TokenGenerator {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async tokenGenerator(req, res, next) {
    if (!(this.username && this.password)) {
      return -1;
    }
    const token = jwt.sign({ user_id: this.username }, cred.secret, {
      expiresIn: "5m",
    });

    return token;
  }
}

module.exports = TokenGenerator;
