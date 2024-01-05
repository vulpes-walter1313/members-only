const { isAuth } = require("../lib/authMiddleware");
const { body, matchedData, validationResult } = require("express-validator");
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

module.exports.create_page = [
  isAuth,
  (req, res) => {
    res.render("postform", {
      title: "Create A Post!",
    });
  },
];

module.exports.create_page_post = [
  isAuth,
  body("title").notEmpty().escape(),
  body("storybody").notEmpty().escape(),
  async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    console.log(result.array());

    if (result.isEmpty()) {
      const newPost = new Post({
        title: data.title,
        body: data.storybody,
        author: req.user,
      });
      await newPost.save();
      res.redirect(`/post/${newPost.id}`);
    } else {
      res.render("postform", {
        title: "Create a post!",
        errors: result.array(),
      });
    }
  },
];

module.exports.post_page = asyncHandler(async (req, res, next) => {
  // res.send(`post:${req.params.postId} controller not implemented`);
  const post = await Post.findById(req.params.postId).populate("author").exec();
  console.log(post);
  if (req.user) {
    const isViewerMember = req.user.member;
    const isViewerAdmin = req.user.admin;
    const isViewerAuthor = req.user.id === post.author.id;
    res.render("post", {
      title: `${post.title} | VIP`,
      user: req.user,
      post: post,
      isMember: isViewerMember,
      isAdmin: isViewerAdmin,
      isAuthor: isViewerAuthor,
    });
  } else {
    res.render("post", {
      title: `${post.title} | VIP`,
      user: req.user,
      post: post,
      isMember: false,
      isAdmin: false,
      isAuthor: false,
    });
  }
});

module.exports.post_delete_get = (req, res) => {
  res.send("post delete not yet implemented");
};

module.exports.post_delete_post = (req, res) => {
  res.send("Post delete POST request not implemented");
};

module.exports.post_update_get = (req, res) => {
  res.send(`Post update page not implemeneted. Post ID: ${req.params.postId}`);
};

module.exports.post_update_post = (req, res) => {
  res.send(
    `Post update POST route not implemeneted. Post ID: ${req.params.postId}`,
  );
};
