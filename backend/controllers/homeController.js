exports.home = (req, res) => {
  res.render("home/home", { currentRoute: "/" });
};

exports.sobre = (req, res) => {
  res.render("home/sobre", { currentRoute: "/sobre" });
};

exports.login = (req, res) => {
  const error = req.session.error;
  req.session.error = null; // Limpa a mensagem de erro após exibi-la
  res.render("home/login", { error });
};
