const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

// All these routes are prepended with `/post/`
router.get("/create", postController.create_page);

router.post("/create", postController.create_page_post);

// individual post routes
router.get("/:postId", postController.post_page);

router.get("/:postId/delete", postController.post_delete_get);

router.post("/:postId/delete", postController.post_delete_post);

router.get("/:postId/update", postController.post_update_get);

router.post("/:postId/update", postController.post_update_post);

module.exports = router;
