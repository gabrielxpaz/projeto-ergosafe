exports.validateUserInput = ({ name, email, password, role_id }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  if (!name || !email || !password || !role_id) {
    return "Todos os campos são obrigatórios.";
  }
  if (!emailRegex.test(email)) {
    return "Email inválido.";
  }
  if (!passwordRegex.test(password)) {
    return "A Senha é fraca demais (1 letra maiuscula, 1 letra minuscula, 1 numero e 1 caractere especial)";
  }
  return null; // Nenhum erro
};
