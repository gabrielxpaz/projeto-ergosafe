const express = require("express");
const db = require("./db/db.js");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Roteamento
app.use("/api/auth", authRoutes);

//Conexão banco
db.sync().then(() => {
  app.listen(5000, () => {
    console.log("Banco de dados conectado!");
  });
});
