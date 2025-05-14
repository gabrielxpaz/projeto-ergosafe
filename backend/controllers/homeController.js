exports.home = (req, res) => {
  const isLoggedIn = req.session.user?.isLoggedIn || false;
  res.render("home/home", { currentRoute: "/", isLoggedIn });
};

exports.sobre = (req, res) => {
  const isLoggedIn = req.session.user?.isLoggedIn || false;
  res.render("home/sobre", { currentRoute: "/sobre", isLoggedIn });
};

exports.login = (req, res) => {
  const isLoggedIn = req.session.user?.isLoggedIn || false;
  if (isLoggedIn) {
    return res.redirect("/home");
  }
  const error = req.session.error;
  req.session.error = null; // Limpa a mensagem de erro após exibi-la
  res.render("home/login", { error });
};
