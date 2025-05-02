exports.validateUserInput = ({ name, email, password, role_id }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!name || !email || !password || !role_id) {
    return "Todos os campos são obrigatórios.";
  }
  if (!emailRegex.test(email)) {
    return "Email inválido.";
  }
  if (!passwordRegex.test(password)) {
    return "A senha deve ter pelo menos 8 caracteres, incluindo uma letra e um número.";
  }
  return null; // Nenhum erro
};
