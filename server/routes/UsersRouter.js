const express = require("express");
const router = express();
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
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

    //xác thực JWT
    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});
module.exports = router;
