exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

exports.isMember = (req, res, next) => {
  if (req.user.member) {
    next();
  } else {
    res.redirect("/membership");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res.redirect("/become-an-admin");
  }
};
