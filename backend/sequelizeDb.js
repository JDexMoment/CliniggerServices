const { Sequelize, DataTypes } = require('sequelize');
const UsersGetPost = require('./user-router');
const controller = require('./user-controller');
// Инициализация Sequelize с использованием SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite', // имя файла базы данных SQLite
});

// Определение модели User
const User = sequelize.define('User', {
    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Синхронизация с базой данных (создание таблицы, если её нет)
sequelize.sync();

// Функция для получения всех пользователей
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        console.error('Ошибка при получении пользователей из базы данных:', error);
        res.status(500).send('Произошла ошибка при получении данных.');
    }
};

// Функция для создания нового пользователя
const createUser = async (req, res) => {
    const { telephone, name } = req.body;

    try {
        const user = await User.create({ telephone, name });
        res.send(user);
    } catch (error) {
        console.error('Ошибка при создании пользователя в базе данных:', error);
        res.status(500).send('Произошла ошибка при сохранении данных.');
    }
};

const getUserById = async (req, res) => {
    const userId = req.query.id;

    if (!userId) {
        return res.status(400).send('Не указан параметр id в запросе.');
    }

    try {
        const user = await User.findByPk(userId);

        if (user) {
            res.send([user]); // Оборачиваем результат в массив, чтобы вернуть его как одиночный объект
        } else {
            res.status(404).send('Пользователь не найден.');
        }
    } catch (error) {
        console.error('Ошибка при поиске пользователя в базе данных:', error);
        res.status(500).send('Произошла ошибка при выполнении запроса.');
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).send('Не указан параметр id в запросе.');
    }

    try {
        const user = await User.findByPk(userId);

        if (user) {
            await user.destroy(); // Удаляем пользователя из базы данных
            res.send('Пользователь успешно удален.');
        } else {
            res.status(404).send('Пользователь не найден.');
        }
    } catch (error) {
        console.error('Ошибка при удалении пользователя из базы данных:', error);
        res.status(500).send('Произошла ошибка при выполнении запроса.');
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser
};
