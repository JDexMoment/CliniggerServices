const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Подключение к базе данных
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
});

// Определение модели для отзывов
const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reviewComment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    toJSON: {
      exclude: ['createdAt', 'updatedAt', 'id'], // Исключаем поля из вывода toJSON
    },
});

sequelize.sync();

// Пример серверного маршрута с использованием Express
const getRev = async (req, res) => {
    try {
      const reviews = await Review.findAll(); // Предположим, что у вас есть модель Review
  
      res.json(reviews);
    } catch (error) {
      console.error('Ошибка при получении отзывов:', error.message);
      res.status(500).send('Ошибка сервера');
    }
}

const postRev = async (req, res) => {
    const { username, reviewComment, rating } = req.body;

    // //Проверяем, что все поля не пустые
    // if (!username || !reviewComment || !rating) {
    //     return res.status(400).json('Спасибо за отправленный отзыв! Вы можете вернуться на основную страницу.');
    // }

    try {
        // Сохранение отзыва в базе данных
        const createdReview = await Review.create({
            username: username,
            reviewComment: reviewComment,
            rating: rating,
        });
        console.log('Полученные данные:', username, reviewComment, rating);

        console.log('Отзыв успешно сохранен в базе данных:', createdReview.toJSON());
        res.status(200).json({ message: 'Отзыв успешно сохранен' });
    } catch (error) {
        console.error('Ошибка при сохранении отзыва:', error);
        res.status(500).json({ error: error.message });
    }
}


// app.listen(port, () => {
//   console.log(`Сервер слушает по адресу http://localhost:${port}`);
// });

module.exports = {
    getRev,
    postRev
};