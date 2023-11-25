const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Выберите подходящий порт

// Используем bodyParser для разбора данных из тела запроса
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подгружаем статические файлы из папки public
app.use(express.static('public'));

// Роут для обработки POST-запроса от формы
app.post('/submitForm', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const service = req.body.service;

    // Ваши дальнейшие действия с данными, например, сохранение в базу данных или отправка уведомления

    // Отправляем ответ клиенту
    res.json({ success: true, message: 'Форма успешно отправлена!' });
});

// Слушаем заданный порт
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
