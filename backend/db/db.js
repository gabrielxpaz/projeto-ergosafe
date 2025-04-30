const mysql2 = require("mysql2");

const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ergosafe",
}); //Database de testes

conn.connect((err) => {
  if (err) {
    console.log("Erro ao conectar ao banco de dados: ", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});

module.exports = conn;
