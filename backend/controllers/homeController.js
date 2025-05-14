exports.home = (req, res) => {
  res.render("home/home", { currentRoute: "/" });
};

exports.sobre = (req, res) => {
  res.render("home/sobre", { currentRoute: "/sobre" });
};
