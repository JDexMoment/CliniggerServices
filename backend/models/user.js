// models/user.js
const { DataTypes } = require('sequelize');
//const sequelize = require('../config/database'); // Подключение к базе данных

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;
