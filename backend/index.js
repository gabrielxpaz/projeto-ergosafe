const express = require("express");
const db = require("./db/db.js");
const app = express();
const cors = require("cors");
const handlebars = require("express-handlebars");
const authRoutes = require("./routes/authRoutes.js");
const homeRoutes = require("./routes/homeRoutes.js");

// Configuração do Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Roteamento
app.use("/api/auth", authRoutes);
app.use("/", homeRoutes);

// Conexão banco
db.sync().then(() => {
  app.listen(5000, () => {
    console.log("Banco de dados conectado!");
  });
});
