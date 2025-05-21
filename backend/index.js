const express = require("express");
const db = require("./db/db.js");
const app = express();
const cors = require("cors");
const session = require("express-session");
const exphbs = require("express-handlebars");
const authRoutes = require("./routes/authRoutes.js");
const homeRoutes = require("./routes/homeRoutes.js");
const dashRoutes = require("./routes/dashRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

const hbs = exphbs.create({
  helpers: {
    eq: (a, b) => a === b,
    json: (context) => JSON.stringify(context),
  },
});

// Configuração do Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Middlewares
app.use(
  session({
    secret: "b7f8d9e2c3a4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d9e0",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //
    },
  })
);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Roteamento
app.use("/auth", authRoutes);
app.use("/", homeRoutes);
app.use("/dashboard", dashRoutes);
app.use("/admin", adminRoutes);

//404
app.use((req, res) => {
  res.status(404).send("<h1>404 - Página não encontrada</h1>");
});

// Conexão banco
db.sync({}).then(() => {
  app.listen(5000, () => {
    console.log("Banco de dados conectado!");
  });
});
