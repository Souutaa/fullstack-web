const express = require("express");
const router = express();
const { Comments } = require("../models");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comment = await Comments.findAll({ where: { PostId: postId } });
  res.json(comment);
});

router.post("/", async (req, res) => {
  try {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
