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
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);

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
  }),
];

module.exports.post_page = asyncHandler(async (req, res, next) => {
  // res.send(`post:${req.params.postId} controller not implemented`);
  const post = await Post.findById(req.params.postId).populate("author").exec();
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

module.exports.post_delete_get = [
  isAuth,
  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId)
      .populate("author")
      .exec();
    if (post) {
      const isAuthor = req.user.id === post.author.id;
      const isAdmin = req.user.admin;
      if (isAuthor || isAdmin) {
        res.render("delete", {
          title: `Deleting post: ${post.id}`,
          post: post,
        });
      } else {
        const error = new Error("Not authorized to view resource");
        error.status = 403;
        next(error);
      }
    } else {
      const error = new Error("post doesn't exist");
      error.status = 404;
      next(error);
    }
  }),
];

module.exports.post_delete_post = [
  isAuth,
  body("postid").isMongoId(),
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);
    const data = matchedData(req);

    if (result.isEmpty()) {
      const post = await Post.findById(data.postid).populate("author").exec();
      const isAuthor = req.user.id === post.author.id;
      const isAdmin = req.user.admin;
      if (isAdmin || isAuthor) {
        await Post.findByIdAndDelete(data.postid).exec();
        res.redirect("/");
      } else {
        const error = new Error("You're not authorized to perform this action");
        error.status = 403;
        return next(error);
      }
    } else {
      const error = new Error("validation error");
      error.status = 500;
      return next(error);
    }
  }),
];

module.exports.post_update_get = [
  isAuth,
  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId)
      .populate("author")
      .exec();
    if (post) {
      if (req.user.id !== post.author.id) {
        const error = new Error("You're not allowed to view this resource");
        error.status = 403;
        return next(error);
      }
      res.render("postform", {
        title: "Update your post",
        postTitle: post.title,
        postBody: post.body,
      });
    } else {
      const error = new Error("that post doesn't exist!");
      error.status = 404;
      return next(error);
    }
  }),
];

module.exports.post_update_post = [
  isAuth,
  body("title").notEmpty().escape(),
  body("storybody").notEmpty().escape(),
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);
    const data = matchedData(req);
    const post = await Post.findById(req.params.postId)
      .populate("author")
      .exec();

    if (post) {
      if (req.user.id !== post.author.id) {
        const error = new Error("You're not allowed to view this resource");
        error.status = 403;
        return next(error);
      }
      if (result.isEmpty()) {
        post.title = data.title;
        post.body = data.storybody;
        await post.save();
        res.redirect(`/post/${post.id}`);
      } else {
        res.render("postform", {
          title: "Create a post!",
          postTitle: post.title,
          postBody: post.body,
          errors: result.array(),
        });
      }
    } else {
      const error = new Error("That post doesn't exist");
      error.status = 500;
      res.send(err);
    }
  }),
];
