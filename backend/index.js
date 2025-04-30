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

app.listen(5000, (err) => {
  if (err) return console.log(err);
  console.log("Servidor rodando!");
});
