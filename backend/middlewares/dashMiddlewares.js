const Role = require("../models/Role");
const User = require("../models/User");

exports.checkAdmin = (req, res, next) => {
  if (req.user.role == "admin") {
    return next();
  }
  res.redirect("/login");
};

exports.userLoader = async (req, res, next) => {
  const userId = req.session.user?.id;
  if (!userId) {
    req.session.destroy();
    return res.redirect("/login");
  }
  const user = await User.findOne({
    where: { id: userId },
    include: {
      model: Role,
      attributes: ["name"],
    },
  });

  if (!user) {
    req.session.destroy();
    return res.redirect("/login");
  }
  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.Role.name,
    first_time: user.first_time,
  };
  next();
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
