const { DataTypes } = require("sequelize");
const User = require("./User");

const db = require("../db/db");

const Role = db.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsTo(Role);

module.exports = Role;
