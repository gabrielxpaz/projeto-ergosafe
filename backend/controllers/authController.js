const User = require("../models/User");
const Role = require("../models/Role");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { validateUserInput } = require("../helpers/validationHelper");
require("dotenv").config();

// Login

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!req.body.email || !req.body.password) {
    req.session.error = "Preencha todos os campos!";
    return res.redirect("/login");
  }
  if (!user) {
    req.session.error = "Email ou senha incorretos!";
    return res.redirect("/login");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    req.session.error = "Email ou senha incorretos!";
    return res.redirect("/login");
  }
  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.RoleId,
    isLoggedIn: true,
  };

  res.redirect("/home");
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao destruir a sessão:", err);
      return res.status(500).send("Erro ao fazer logout");
    }
    res.redirect("/login");
  });
};
