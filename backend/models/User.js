const { DataTypes } = require("sequelize");
const Paciente = require("./Paciente");

const db = require("../db/db");

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_time: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Paciente.belongsTo(User);

module.exports = User;
