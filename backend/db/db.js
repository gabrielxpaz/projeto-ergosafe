const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("ergosafe", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
