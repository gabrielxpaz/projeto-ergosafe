const { DataTypes } = require('sequelize');
const Dados = require('./Dados');
const db = require('../db/db');

const Paciente = db.define('Paciente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idade:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})

Dados.belongsTo(Paciente);
module.exports = Paciente;