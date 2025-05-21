const User = require("../models/User");
const Role = require("../models/Role");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { validateUserInput } = require("../helpers/validationHelper");
const { Op } = require("sequelize");
require("dotenv").config();

exports.dashboard = async (req, res) => {
  const user = req.session.user;
  const role = user.role;

  res.render("dash/dash", { layout: role, user });
};

exports.firstTimeScreen = (req, res) => {
  const user = req.session.user;
  const error = req.session.error;
  req.session.error = null; // Limpa a mensagem de erro após exibi-la
  if (!user || !user.first_time) {
    return res.redirect("/dashboard");
  }

  res.render("dash/first-time", {
    layout: none,
    user,
  });
};
