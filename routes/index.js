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

router.get("/login", (req, res) => {
  res.send("'/login' GET not implemented");
});

router.post("/login", (req, res) => {
  res.send("'/login' POST not implemented");
});

router.get("/membership", (req, res) => {
  res.send("/membership GET route not implemented");
});

router.post("/membership", (req, res) => {
  res.send("/membership POST route not implemented");
});

router.get("/welcome-new-member", (req, res) => {
  res.send("/welcome-new-member GET route not implemented");
});

router.get("/become-an-admin", (req, res) => {
  res.send("/become-an-admin GET route not implemented");
});

router.post("/become-an-admin", (req, res) => {
  res.send("/become-an-admin POST route not implemented");
});

module.exports = router;
