const express = require("express");
const indexController = require("../controllers/indexController");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "VIP Message Board" });
});

// GET signup page
router.get("/signup", indexController.signup_get);

// POST signup
router.post("/signup", indexController.signup_post);

module.exports = router;
