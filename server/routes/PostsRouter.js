const express = require("express");
const router = express();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const listPost = await Posts.findAll();
  res.json(listPost);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
