const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const { validateUserInput } = require("../helpers/validationHelper");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, password, role_id } = req.body;

  // Validação usando o helper
  const validationError = validateUserInput({ name, email, password, role_id });
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  // Verificando se o email existe
  try {
    const role = await Role.findByPk(role_id);
    if (!role) {
      return res.status(400).json({ message: "Função inválida." });
    }
    // Verificando se o email existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }
    // Criptografando senha
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALTS_ROUNDS)
    );

    // Criando usuário, finalmente
    await User.create({
      name,
      email,
      password: hashedPassword,
      role_id,
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar usuário.", error: error.message });
  }
};
