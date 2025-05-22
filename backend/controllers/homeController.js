exports.home = (req, res) => {
  const user = req.session.user?.id;
  res.render("home/home", { currentRoute: "/", user });
};

exports.sobre = (req, res) => {
  const user = req.session.user?.id;
  res.render("home/sobre", { currentRoute: "/sobre", user });
};

exports.login = (req, res) => {
  const user = req.session.user?.id;
  if (user) {
    return res.redirect("/home");
  }
  const error = req.session.error;
  req.session.error = null; // Limpa a mensagem de erro após exibi-la
  res.render("home/login", { error });
};
