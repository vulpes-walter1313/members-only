module.exports.index_get = (req, res) => {
  res.render("index", { title: "VIP Message Board" });
};

module.exports.signup_get = (req, res) => {
  res.render("signup", { title: "Sign Up" });
};

module.exports.signup_post = (req,res) => {
  res.send("Post not implemented: POST /signup");
}
