const { body, matchedData, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { isAuth, isMember, isAdmin } = require("../lib/authMiddleware");

module.exports.index_get = (req, res) => {
  res.render("index", { title: "VIP Message Board", user: req.user });
};

module.exports.signup_get = (req, res) => {
  res.render("signup", { title: "Sign Up" });
};

module.exports.signup_post = [
  body("firstname").notEmpty().escape(),
  body("lastname").notEmpty().escape(),
  body("username").isEmail().escape(),
  body("password").notEmpty(),
  async (req, res, next) => {
    const validRes = validationResult(req);
    if (validRes.isEmpty()) {
      const data = matchedData(req);
      try {
        const password = await bcrypt.hash(data.password, 10);
        const newUser = new User({
          firstName: data.firstname,
          lastName: data.lastname,
          username: data.username,
          password: password,
          member: false,
          admin: false,
        });
        await newUser.save();
        console.log(newUser);
        res.redirect("/login");
      } catch (err) {
        return next(err);
      }
    } else {
      res.send({ errors: validRes.array() });
    }
  },
];

module.exports.logout_get = [
  isAuth,
  (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];

module.exports.login_page = (req, res) => {
  res.render("login", { title: "VIP Login" });
};

module.exports.login_post = [
  body("username").isEmail().escape(),
  body("password").notEmpty(),
  (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      next();
    } else {
      res.render("login", { title: "login", errors: result.array() });
    }
  },
  passport.authenticate("local", { successRedirect: "/", failureRedirect: "" }),
];

// membership routes
module.exports.membership_page = [
  isAuth,
  (req, res) => {
    res.render("membership", { title: "Become a member" });
  },
];

module.exports.membership_post = [
  isAuth,
  body("memberpassword").notEmpty(),
  async (req, res) => {
    const validRes = validationResult(req);

    if (validRes.isEmpty()) {
      const data = matchedData(req);
      console.log(req.user);
      if (data.memberpassword === process.env.MEMBERSHIP_SECRET) {
        req.user.member = true;
        await req.user.save();
        res.redirect("/welcome-new-member");
      } else {
        res.render("membership", {
          title: "Become a member",
          wrongPassword: true,
        });
      }
    } else {
      res.send({ errors: validRes.array() });
    }
  },
];

// welcome new member page
module.exports.welcome_member_page = [
  isAuth,
  (req, res) => {
    res.render("welcome", {
      title: `Welcome, ${req.user.fullName}!`,
      user: req.user,
    });
  },
];

module.exports.welcome_admin_page = [
  isAuth,
  isAdmin,
  (req, res) => {
    res.render("welcomeadmin", {
      title: `Welcome admin, ${req.user.fullName}!`,
      user: req.user,
    });
  },
];

// become an admin routes
module.exports.become_admin_page = [
  isAuth,
  isMember,
  (req, res) => {
    res.render("becomeadmin", { title: "Become An Admin", user: req.user });
  },
];

module.exports.become_admin_post = [
  isAuth,
  isMember,
  body("adminpassword").notEmpty(),
  async (req, res) => {
    const validRes = validationResult(req);

    if (validRes.isEmpty()) {
      const data = matchedData(req);
      console.log(req.user);
      if (data.adminpassword === process.env.ADMIN_SECRET) {
        req.user.admin = true;
        await req.user.save();
        res.redirect("/welcome-new-admin");
      } else {
        res.render("becomeadmin", {
          title: "Become An Admin",
          wrongPassword: true,
        });
      }
    } else {
      res.send({ errors: validRes.array() });
    }
  },
];
