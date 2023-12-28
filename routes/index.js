const express = require("express");
const indexController = require("../controllers/indexController");
const router = express.Router();

/* GET home page. */
router.get("/", indexController.index_get);

// GET signup page
router.get("/signup", indexController.signup_get);

// POST signup
router.post("/signup", indexController.signup_post);

router.get("/login", indexController.login_page);

router.post("/login", indexController.login_post);

router.get("/logout", indexController.logout_get);

router.get("/membership", indexController.membership_page);

router.post("/membership", indexController.membership_post);

router.get("/welcome-new-member", indexController.welcome_member_page);

router.get("/become-an-admin", indexController.become_admin_page);

router.post("/become-an-admin", indexController.become_admin_post);

module.exports = router;
