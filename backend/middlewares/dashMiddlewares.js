const Role = require("../models/Role");
const User = require("../models/User");

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

exports.checkFirstTime = async (req, res, next) => {
  const userId = req.session.user.id;
  const user = await User.findOne({
    where: { id: userId },
  });

  // Permite acesso à tela de first-time sem redirecionar em loop
  if (req.path === "/first-time") return next();
  console.log("oi");

  if (user.first_time) {
    return res.redirect("/dashboard/first-time");
  }

  next();
};
