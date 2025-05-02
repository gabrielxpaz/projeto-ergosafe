const { DataTypes } = require("sequelize");

const db = require("../db/db");

const Role = db.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// A associação deve ser configurada manualmente em outro lugar, como no arquivo de inicialização dos modelos.
Role.associate = (models) => {
  Role.hasMany(models.User, {
    foreignKey: "role_id",
    as: "users",
  });
};

module.exports = Role;
