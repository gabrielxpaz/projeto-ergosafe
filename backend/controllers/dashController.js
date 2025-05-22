const User = require("../models/User");
const Role = require("../models/Role");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { validateUserInput } = require("../helpers/validationHelper");
const { Op } = require("sequelize");
require("dotenv").config();

exports.dashboard = async (req, res) => {
  const user = req.user;
  const role = user.role;

  res.render("dash/dash", { layout: role, user });
};
