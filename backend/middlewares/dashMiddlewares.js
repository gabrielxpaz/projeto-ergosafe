exports.checkAuth = (req, res, next) => {
  if (req.session.user && req.session.user.isLoggedIn) {
    next();
  } else {
    req.session.error = "Você precisa estar logado para acessar essa página!";
    res.redirect("/login");
  }
};

exports.checkAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else {
    res.redirect("/dashboard");
  }
};
