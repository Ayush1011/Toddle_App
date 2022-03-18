const express = require("express");
const loginRouter = express.Router();
const generateUtil = require("../util/Token-generator");

loginRouter.use(express.urlencoded({ extended: true }));

loginRouter
  .route("/")
  .get(async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(req.session.username);
  })

  .post(async (req, res) => {
    try {
      const { username, password } = req.body;
      const TokenGen = new generateUtil(username, password);
      const Token = await TokenGen.tokenGenerator();

      req.session.token = Token;
      req.session.usename = username;

      res.send({ Token });
    } catch (err) {
      console.warn(err);
    }
  });

module.exports = loginRouter;
