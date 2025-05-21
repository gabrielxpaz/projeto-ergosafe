const generatePassword = require("generate-password");

exports.validateUserInput = ({ name, email, password, role_id }, mode) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  switch (mode) {
    case "create":
      if (!name || !email || !password || !role_id) {
        return "Todos os campos são obrigatórios.";
      }
      if (!emailRegex.test(email)) {
        return "Email inválido.";
      }
      if (!passwordRegex.test(password)) {
        return "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.";
      }
      break;
    case "edit":
      if (!name || !email || !role_id) {
        return "Todos os campos são obrigatórios.";
      }
      if (!emailRegex.test(email)) {
        return "Email inválido.";
      }
      if (password && !passwordRegex.test(password)) {
        return "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.";
      }
      break;
    default:
      return "Modo inválido.";
  }
};

exports.generatePassword = () => {
  const senha = generatePassword.generate({
    length: 12, // tamanho da senha
    numbers: true, // inclui números
    symbols: true, // inclui símbolos
    uppercase: true, // inclui letras maiúsculas
    lowercase: true, // inclui letras minúsculas
    strict: true, // garante que todos os tipos estejam presentes
  });

  return senha;
};
