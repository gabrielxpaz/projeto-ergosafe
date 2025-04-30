const db = require("../db/db");

exports.register = (req, res) => {
  const { name, email, password, role_id } = req.body;
  const insertUserSql =
    "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 8 caracteres, pelo menos uma letra e um número
  const checkRoleSql = "SELECT * FROM roles WHERE id = ?";
  // Validações
  if (!name || !email || !password || !role_id) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email inválido." });
  }
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({
        message:
          "Senha deve ter pelo menos 8 caracteres, uma letra e um número.",
      });
  }
  // Verificando se a role existe
  db.query(checkRoleSql, [role_id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Erro ao verificar a role." });
    if (result.length === 0)
      return res.status(400).json({ message: "Role não existe." });
    // Verificando se o email já existe
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err)
        return res.status(500).json({ message: "Erro ao verificar o email." });
      if (result.length > 0)
        return res.status(400).json({ message: "Email já cadastrado." });
      // Inserindo o usuário no banco de dados
      db.query(
        insertUserSql,
        [name, email, password, role_id],
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Erro ao cadastrar o usuário." });
          return res
            .status(201)
            .json({ message: "Usuário cadastrado com sucesso!" });
        }
      );
    });
  });
};
