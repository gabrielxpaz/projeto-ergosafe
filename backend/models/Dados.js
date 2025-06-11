const { DataTypes } = require('sequelize');
const db = require('../db/db');

const Dados = db.define('Dados', {
    yaw0: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    yaw1: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    yaw2: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    yaw3: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    pitch0: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    pitch1: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    pitch2: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    pitch3: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    sensorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Dados;
