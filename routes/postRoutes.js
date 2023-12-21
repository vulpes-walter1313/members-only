const express = require("express");
const router = express.Router();

// All these routes are prepended with `/post/`
router.get("/create", (req, res) => {
  res.send("/post/create GET route not implemented");
});

router.post("/create", (req, res) => {
  res.send("/post/create POST route not implemented");
});

// individual post routes
router.get("/:postId", (req, res) => {
  res.send(`/post/${req.params.postId} is not implemented`);
});

router.get("/:postId/delete", (req, res) => {
  res.send(`Post delete confirmation page not implemented`);
});

router.post("/:postId/delete", (req, res) => {
  res.send("Post delete post request not implemented");
});

router.get("/:postId/update", (req, res) => {
  res.send(`Post update page not implemeneted. Post ID: ${req.params.postId}`);
});

router.post("/:postId/update", (req, res) => {
  res.send(
    `Post update POST route not implemeneted. Post ID: ${req.params.postId}`,
  );
});

module.exports = router;
