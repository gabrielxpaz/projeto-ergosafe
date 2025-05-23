const User = require("../models/User");
const Role = require("../models/Role");
const session = require("express-session");
const bcrypt = require("bcrypt");
const {
  validateUserInput,
  generatePassword,
} = require("../helpers/validationHelper");
const { Op } = require("sequelize");
require("dotenv").config();

exports.users = async (req, res) => {
  const usersRaw = await User.findAll({
    include: {
      model: Role,
      attributes: ["name"],
    },
    raw: true,
  });

  const users = usersRaw.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u["Role.name"],
  }));

  res.render("admin/users", { layout: "admin", users });
};

exports.createUserScreen = async (req, res) => {
  const error = req.session.error;
  req.session.error = null; // Limpa a mensagem de erro após exibi-la
  const roles = await Role.findAll({
    raw: true,
  });
  res.render("admin/createUser", { layout: "admin", roles, error });
};

exports.createUser = async (req, res) => {
  const { name, email, password, role_id } = req.body;

  const error = validateUserInput({ name, email, password, role_id }, "create");
  if (error) {
    req.session.error = error;
    return res.redirect("/admin/criar-usuario");
  }

  const isRoleValid = await Role.findOne({
    where: {
      id: role_id,
    },
  });
  if (!isRoleValid) {
    req.session.error = "Função inválida!";
    return res.redirect("/admin/criar-usuario");
  }

  // Verifica se já existe um usuário com o mesmo email
  const existingUser = await User.findOne({
    where: { email },
  });
  if (existingUser) {
    req.session.error = "Já existe um usuário com este e-mail!";
    return res.redirect("/admin/criar-usuario");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    RoleId: role_id,
  });

  res.redirect("/admin/users");
};

exports.editUserScreen = async (req, res) => {
  const error = req.session.error;
  const userId = req.params.id;
  const user = await User.findByPk(userId, { raw: true });
  const roles = await Role.findAll({
    raw: true,
  });

  console.log(user);
  if (!user) {
    req.session.error = "Usuário não encontrado!";
    return res.redirect("/dashboard/");
  }

  res.render("admin/editUser", { layout: "admin", user, roles, error });
};

exports.editUser = async (req, res) => {
  const { id, name, email, password, role_id } = req.body;
  console.log("OI");
  const error = validateUserInput({ name, email, password, role_id }, "edit");
  req.session.error = null; // Limpa a mensagem de erro após exibi-la

  if (error) {
    req.session.error = error;
    return res.redirect(`/admin/editar-usuario/${id}`);
  }

  const isRoleValid = await Role.findOne({
    where: {
      id: role_id,
    },
  });
  if (!isRoleValid) {
    req.session.error = "Função inválida!";
    return res.redirect(`/admin/editar-usuario/${id}`);
  }

  const user = await User.findByPk(id);
  if (!user) {
    req.session.error = "Usuário não encontrado!";
    return res.redirect(`/admin/editar-usuario/${id}`);
  }

  // Verifica se já existe outro usuário com o mesmo email
  const existingUser = await User.findOne({
    where: {
      email,
      id: { [Op.ne]: id }, // Busca por email igual, mas id diferente
    },
  });
  if (existingUser) {
    req.session.error = "Já existe um usuário com este e-mail!";
    return res.redirect(`/admin/editar-usuario/${id}`);
  }

  let newPassword = user.password;
  if (password && password.trim() !== "") {
    // Se a senha fornecida for diferente da atual, faz o hash
    if (!(await bcrypt.compare(password, user.password))) {
      newPassword = await bcrypt.hash(password, 10);
    }
  }

  await User.update(
    {
      name,
      email,
      password: newPassword,
      RoleId: role_id,
    },
    {
      where: {
        id,
      },
    }
  );
  res.redirect("/admin/users");
};

exports.adminResetPassword = async (req, res) => {
  const { id } = req.params;
  const password = generatePassword();
  console.log(password);

  const user = await User.findByPk(id);
  if (!user) {
    req.session.error = "Usuário não encontrado!";
    return res.redirect("/admin/editar-usuario");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.update(
    {
      password: hashedPassword,
    },
    {
      where: {
        id,
      },
    }
  );
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findByPk(userId);
  if (!user) {
    req.session.error = "Usuário não encontrado!";
    return res.redirect("/admin/usuarios");
  }

  await User.destroy({
    where: {
      id: userId,
    },
  });

  res.redirect("/admin/users");
};
