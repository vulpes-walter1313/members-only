module.exports.index_get = (req, res) => {
  res.render("index", { title: "VIP Message Board" });
};

module.exports.signup_get = (req, res) => {
  res.render("signup", { title: "Sign Up" });
};

module.exports.signup_post = (req, res) => {
  res.send("Post not implemented: POST /signup");
};

module.exports.login_page = (req, res) => {
  res.render("login", { title: "VIP Login" });
};

module.exports.login_post = (req, res) => {
  res.send("'/login' POST not implemented");
};

// membership routes
module.exports.membership_page = (req, res) => {
  res.send("/membership GET route not implemented");
};
module.exports.membership_post = (req, res) => {
  res.send("/membership POST route not implemented");
};

// welcome new member page
module.exports.welcome_member_page = (req, res) => {
  res.send("/welcome-new-member GET route not implemented");
};

// become an admin routes
module.exports.become_admin_page = (req, res) => {
  res.send("/become-an-admin GET route not implemented");
};
module.exports.become_admin_post = (req, res) => {
  res.send("/become-an-admin POST route not implemented");
};
