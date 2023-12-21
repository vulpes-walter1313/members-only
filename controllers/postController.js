module.exports.create_page = (req, res) => {
  res.send("post create page is not yet implemented");
};

module.exports.create_page_post = (req, res) => {
  res.send("post Create POST route not implemented yet");
};

module.exports.post_page = (req, res) => {
  res.send(`post:${req.params.postId} controller not implemented`);
};

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
