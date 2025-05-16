const User = require("../models/User");
const Role = require("../models/Role");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { validateUserInput } = require("../helpers/validationHelper");
require("dotenv").config();

exports.dashboard = async (req, res) => {
  const role = req.session.user.role;
  const usersRaw = await User.findAll({
    include: {
      model: Role,
      attributes: ["name"],
    },
    raw: true,
  });

  console.log(usersRaw);

  const users = usersRaw.map((u) => [u.name, u.email, u["Role.name"]]);

  res.render("dash/users", { layout: role, users });
};
