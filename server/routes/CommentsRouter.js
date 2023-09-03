const express = require("express");
const router = express();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//nhận request "/" xong sau đố vào middleware(validateToken) để check, sau khi check đúng thì mới vào async (req, res) =>{}
router.post("/", validateToken, async (req, res) => {
  try {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comment = await Comments.findAll({ where: { PostId: postId } });
  res.json(comment);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("Deleted successfully");
});
module.exports = router;
