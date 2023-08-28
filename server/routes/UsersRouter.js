const express = require("express");
const router = express();
const { Users } = require("../models");

const protectPassword = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    protectPassword.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json(`Successfully create a user: "${username} -- ${hash}"`);
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "User doesn't exist" });
  }
  protectPassword.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Wrong username and password" });
    }

    res.json("YOU LOGGED IN!!!");
  });
});

module.exports = router;
