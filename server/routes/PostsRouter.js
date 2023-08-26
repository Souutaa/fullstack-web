const express = require("express");
const router = express();
const db = require("../models");

router.get("/", async (req, res) => {
  const listPost = await db.Posts.findAll();
  res.json(listPost);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await db.Posts.findByPk(id);
  res.json(post);
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    await db.Posts.create(post);
    res.json(post);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
